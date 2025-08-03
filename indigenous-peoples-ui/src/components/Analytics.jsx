import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Globe, CheckCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Analytics() {
  const { data, stats, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Prepare chart data
  const statusData = {
    labels: ['Complete', 'In Progress', 'Not Started', 'Needs Update'],
    datasets: [{
      label: 'Status Distribution',
      data: [
        stats?.dataQuality.complete || 0,
        countByStatus(data, 'In Progress'),
        countByStatus(data, 'Not Started'),
        countByStatus(data, 'Needs Update')
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(250, 204, 21, 0.8)',
        'rgba(156, 163, 175, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(250, 204, 21)',
        'rgb(156, 163, 175)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 1
    }]
  };

  const regionData = {
    labels: ['Vancouver Island', 'New Zealand'],
    datasets: [{
      label: 'Groups by Region',
      data: [
        data.vancouverIsland.length,
        data.newZealand.length
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(147, 51, 234, 0.8)'
      ]
    }]
  };

  const populationData = {
    labels: getTop10ByPopulation(data).map(item => item.name),
    datasets: [{
      label: 'Population',
      data: getTop10ByPopulation(data).map(item => item.population),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const dataQualityTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Complete Entries',
      data: [45, 52, 58, 65, 72, 78, 85, 91],
      fill: true,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgb(34, 197, 94)',
      tension: 0.4
    }]
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">
          Visual insights into the database
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          icon={<TrendingUp />}
          label="Growth Rate"
          value="+127%"
          subtitle="Last 6 months"
          trend="up"
        />
        <SummaryCard
          icon={<Users />}
          label="Avg Population"
          value={calculateAvgPopulation(data).toLocaleString()}
          subtitle="Per group"
        />
        <SummaryCard
          icon={<Globe />}
          label="Coverage"
          value="2/195"
          subtitle="Countries"
        />
        <SummaryCard
          icon={<CheckCircle />}
          label="Data Quality"
          value={stats ? Math.round((stats.dataQuality.complete / stats.total) * 100) + '%' : '0%'}
          subtitle="Complete entries"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Status Distribution" delay={0.1}>
          <Doughnut 
            data={statusData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </ChartCard>

        <ChartCard title="Regional Distribution" delay={0.2}>
          <Bar 
            data={regionData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </ChartCard>

        <ChartCard title="Top 10 by Population" delay={0.3} className="lg:col-span-2">
          <Bar 
            data={populationData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </ChartCard>

        <ChartCard title="Data Quality Trend" delay={0.4} className="lg:col-span-2">
          <Line 
            data={dataQualityTrend} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </ChartCard>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            title="Largest Population"
            value={getLargestByPopulation(data)?.name || 'N/A'}
            subtitle={`${getLargestByPopulation(data)?.population?.toLocaleString() || 0} people`}
          />
          <InsightCard
            title="Most Complete Region"
            value="New Zealand"
            subtitle="78% entries complete"
          />
          <InsightCard
            title="Data Coverage"
            value={`${stats?.dataQuality.withWebsites || 0} groups`}
            subtitle="Have official websites"
          />
          <InsightCard
            title="Recent Updates"
            value={countRecentUpdates(data)}
            subtitle="Updated in last 30 days"
          />
        </div>
      </motion.div>
    </div>
  );
}

function SummaryCard({ icon, label, value, subtitle, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-primary-100 rounded-lg">
          <span className="text-primary-600">{icon}</span>
        </div>
        {trend && (
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </motion.div>
  );
}

function ChartCard({ title, children, delay, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="h-64">
        {children}
      </div>
    </motion.div>
  );
}

function InsightCard({ title, value, subtitle }) {
  return (
    <div className="border-l-4 border-primary-500 pl-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

// Helper functions
function countByStatus(data, status) {
  const allData = [...data.vancouverIsland, ...data.newZealand];
  return allData.filter(item => item.status === status).length;
}

function getTop10ByPopulation(data) {
  const allData = [...data.vancouverIsland, ...data.newZealand];
  return allData
    .filter(item => item.population)
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);
}

function getLargestByPopulation(data) {
  const allData = [...data.vancouverIsland, ...data.newZealand];
  return allData
    .filter(item => item.population)
    .sort((a, b) => b.population - a.population)[0];
}

function calculateAvgPopulation(data) {
  const allData = [...data.vancouverIsland, ...data.newZealand];
  const withPopulation = allData.filter(item => item.population);
  if (withPopulation.length === 0) return 0;
  const total = withPopulation.reduce((sum, item) => sum + item.population, 0);
  return Math.round(total / withPopulation.length);
}

function countRecentUpdates(data) {
  const allData = [...data.vancouverIsland, ...data.newZealand];
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return allData.filter(item => {
    if (!item.lastVerified) return false;
    return new Date(item.lastVerified) > thirtyDaysAgo;
  }).length;
}

export default Analytics;