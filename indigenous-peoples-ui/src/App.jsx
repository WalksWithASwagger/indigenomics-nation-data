import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Database, BarChart3, Map, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Analytics from './components/Analytics';
import MapView from './components/MapView';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Indigenous Peoples
                <span className="block text-sm font-normal text-gray-500 mt-1">
                  Global Database
                </span>
              </h1>
            </div>
            
            <ul className="mt-6">
              <NavLink to="/" icon={<Home />} text="Dashboard" />
              <NavLink to="/data" icon={<Database />} text="Data Explorer" />
              <NavLink to="/analytics" icon={<BarChart3 />} text="Analytics" />
              <NavLink to="/map" icon={<Map />} text="Map View" />
            </ul>

            <div className="absolute bottom-0 w-64 p-6">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
                <p className="text-sm font-medium">Database Status</p>
                <p className="text-2xl font-bold mt-1">91 Groups</p>
                <p className="text-xs opacity-90 mt-1">2 Regions Active</p>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data" element={<DataTable />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/map" element={<MapView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200"
      >
        <span className="w-5 h-5 mr-3">{icon}</span>
        {text}
      </Link>
    </li>
  );
}

export default App;