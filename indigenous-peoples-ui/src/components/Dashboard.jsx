import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { 
  Users, Globe, CheckCircle, Clock, TrendingUp, 
  Database, ExternalLink, RefreshCw 
} from 'lucide-react';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { data, stats, loading, error, refresh } = useData();
  const [animatedNumbers, setAnimatedNumbers] = useState({
    total: 0,
    vancouverIsland: 0,
    newZealand: 0,
    complete: 0
  });

  // Animate numbers on load
  useEffect(() => {
    if (stats) {
      const duration = 1500;
      const steps = 30;
      const interval = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedNumbers({
          total: Math.round(stats.total * progress),
          vancouverIsland: Math.round(stats.byRegion.vancouverIsland.total * progress),
          newZealand: Math.round(stats.byRegion.newZealand.total * progress),
          complete: Math.round(stats.dataQuality.complete * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [stats]);

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={refresh} className="btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Indigenous Peoples Database
        </h1>
        <p className="text-gray-600 mb-8">
          Comprehensive database tracking Indigenous peoples across regions
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users />}
          title="Total Groups"
          value={animatedNumbers.total}
          subtitle="Across all regions"
          color="bg-blue-500"
          delay={0}
        />
        <StatCard
          icon={<Globe />}
          title="Vancouver Island"
          value={animatedNumbers.vancouverIsland}
          subtitle="First Nations"
          color="bg-green-500"
          delay={0.1}
        />
        <StatCard
          icon={<Globe />}
          title="New Zealand"
          value={animatedNumbers.newZealand}
          subtitle="Māori Iwi"
          color="bg-purple-500"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle />}
          title="Complete Entries"
          value={animatedNumbers.complete}
          subtitle={`${stats ? Math.round((stats.dataQuality.complete / stats.total) * 100) : 0}% completion rate`}
          color="bg-emerald-500"
          delay={0.3}
        />
      </div>

      {/* Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionCard
          title="Vancouver Island First Nations"
          data={stats?.byRegion.vancouverIsland}
          items={data.vancouverIsland.slice(0, 5)}
          color="green"
        />
        <RegionCard
          title="New Zealand Māori Iwi"
          data={stats?.byRegion.newZealand}
          items={data.newZealand.slice(0, 5)}
          color="purple"
        />
      </div>

      {/* Data Quality Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Quality Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QualityMetric
            label="With Official Websites"
            value={stats?.dataQuality.withWebsites || 0}
            total={stats?.total || 0}
          />
          <QualityMetric
            label="With Population Data"
            value={stats?.dataQuality.withPopulation || 0}
            total={stats?.total || 0}
          />
          <QualityMetric
            label="Recently Verified"
            value={data.vancouverIsland.filter(d => isRecent(d.lastVerified)).length + 
                   data.newZealand.filter(d => isRecent(d.lastVerified)).length}
            total={stats?.total || 0}
          />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="stat-card"
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </motion.div>
  );
}

function RegionCard({ title, data, items, color }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      
      {data && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(data.byStatus).map(([status, count]) => (
            <span
              key={status}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === 'Complete' ? 'bg-green-100 text-green-800' :
                status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {status}: {count}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className={`p-3 rounded-lg border ${colorClasses[color]} flex justify-between items-center`}
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm opacity-75">
                {item.culturalGroup || item.region || 'No region data'}
              </p>
            </div>
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function QualityMetric({ label, value, total }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-20 h-20">
          <circle
            className="text-gray-200"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
          <motion.circle
            className="text-primary-600"
            strokeWidth="5"
            strokeDasharray={188.5}
            strokeDashoffset={188.5 - (188.5 * percentage) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
            initial={{ strokeDashoffset: 188.5 }}
            animate={{ strokeDashoffset: 188.5 - (188.5 * percentage) / 100 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
        <span className="absolute text-xl font-semibold">{percentage}%</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{label}</p>
      <p className="text-xs text-gray-500">{value} of {total}</p>
    </div>
  );
}

function isRecent(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return date > thirtyDaysAgo;
}

export default Dashboard;