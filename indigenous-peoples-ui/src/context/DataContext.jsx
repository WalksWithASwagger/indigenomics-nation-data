import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }) {
  const [data, setData] = useState({
    vancouverIsland: [],
    newZealand: [],
    total: 0,
    lastUpdated: null
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const [dataResponse, statsResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/data'),
        axios.get('http://localhost:3001/api/stats')
      ]);
      
      setData(dataResponse.data);
      setStats(statsResponse.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please ensure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Get all data combined
  const getAllData = () => {
    return [...data.vancouverIsland, ...data.newZealand];
  };

  // Search function
  const searchData = (query) => {
    const allData = getAllData();
    const lowercaseQuery = query.toLowerCase();
    
    return allData.filter(item => 
      item.name?.toLowerCase().includes(lowercaseQuery) ||
      item.traditionalName?.toLowerCase().includes(lowercaseQuery) ||
      item.territory?.toLowerCase().includes(lowercaseQuery) ||
      item.rohe?.toLowerCase().includes(lowercaseQuery) ||
      item.region?.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Filter functions
  const filterByStatus = (status) => {
    const allData = getAllData();
    return status === 'All' ? allData : allData.filter(item => item.status === status);
  };

  const filterByRegion = (region) => {
    if (region === 'vancouverIsland') return data.vancouverIsland;
    if (region === 'newZealand') return data.newZealand;
    return getAllData();
  };

  const value = {
    data,
    stats,
    loading,
    error,
    getAllData,
    searchData,
    filterByStatus,
    filterByRegion,
    refresh: fetchData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}