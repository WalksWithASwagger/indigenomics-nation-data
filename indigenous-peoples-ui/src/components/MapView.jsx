import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Map, MapPin, Info, Globe2 } from 'lucide-react';

function MapView() {
  const { data, loading } = useData();

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

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Territory Map</h1>
        <p className="text-gray-600">
          Geographic visualization of Indigenous territories
        </p>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
      >
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              {/* Simple world map outline */}
              <path
                d="M 200,300 Q 300,200 400,250 T 600,280 Q 700,320 800,300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              />
              <circle cx="250" cy="280" r="5" fill="currentColor" className="text-green-600" />
              <circle cx="750" cy="320" r="5" fill="currentColor" className="text-purple-600" />
            </svg>
          </div>
          
          <div className="text-center z-10">
            <Globe2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Interactive Map Coming Soon
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              Future integration with mapping services will show traditional territories, 
              current locations, and cultural regions for all documented Indigenous peoples.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Region Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegionCard
          title="Vancouver Island"
          subtitle="British Columbia, Canada"
          groups={data.vancouverIsland.length}
          color="green"
          territories={[
            "Coast Salish - Southern region",
            "Nuu-chah-nulth - West coast",
            "Kwakwaka'wakw - Northern region"
          ]}
        />
        <RegionCard
          title="New Zealand"
          subtitle="Aotearoa"
          groups={data.newZealand.length}
          color="purple"
          territories={[
            "Te Tai Tokerau - Northland",
            "Te Moana-a-Toi - Bay of Plenty",
            "Te Waipounamu - South Island"
          ]}
        />
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LegendItem icon={<MapPin />} label="Traditional Territory" color="text-blue-600" />
          <LegendItem icon={<Map />} label="Current Settlements" color="text-green-600" />
          <LegendItem icon={<Info />} label="Overlapping Claims" color="text-yellow-600" />
        </div>
      </motion.div>
    </div>
  );
}

function RegionCard({ title, subtitle, groups, color, territories }) {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-4 text-white`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-gray-900">{groups}</span>
          <span className="text-sm text-gray-500">Indigenous groups</span>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Major Territories:</p>
          {territories.map((territory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              {territory}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function LegendItem({ icon, label, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`${color}`}>{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

export default MapView;