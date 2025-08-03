# Indigenous Peoples Database UI

A modern, animated React dashboard for visualizing and exploring the Global Indigenous Peoples Database.

## 🚀 Quick Start

```bash
# Install dependencies and start both server and UI
npm start

# Or run separately:
npm run server  # Start API server on port 3001
npm run dev     # Start React UI on port 5173
```

Visit http://localhost:5173 to see the UI.

## ✨ Features

### Dashboard
- **Animated Statistics**: Real-time counters showing total groups, regional breakdowns
- **Data Quality Metrics**: Visual indicators of database completeness
- **Recent Entries**: Quick view of latest additions
- **Regional Summaries**: Cards for each active region

### Data Explorer
- **Advanced Search**: Search across names, territories, regions
- **Filtering**: By status, region, and other criteria
- **Sorting**: Click column headers to sort
- **Pagination**: Navigate through large datasets
- **Export**: Download data as CSV

### Analytics
- **Interactive Charts**: 
  - Status distribution (doughnut chart)
  - Regional breakdown (bar chart)
  - Population rankings (horizontal bar)
  - Data quality trends (line chart)
- **Key Insights**: Automated analysis of data patterns
- **Growth Metrics**: Track database expansion over time

### Map View (Placeholder)
- Visual representation of territories
- Regional groupings
- Future: Interactive mapping integration

## 🎨 UI Features

### Animations (Framer Motion)
- Smooth page transitions
- Card hover effects
- Number counting animations
- Staggered list animations
- Loading spinners

### Responsive Design
- Mobile-friendly layouts
- Adaptive navigation
- Touch-optimized controls

### Modern Stack
- **React 18** with hooks
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Chart.js** for visualizations
- **Lucide React** for icons
- **Axios** for API calls

## 🏗️ Architecture

```
src/
├── components/          # UI Components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── DataTable.jsx   # Searchable table
│   ├── Analytics.jsx   # Charts & insights
│   └── MapView.jsx     # Map placeholder
├── context/            # State management
│   └── DataContext.jsx # Global data provider
├── App.jsx             # Main app with routing
└── index.css          # Tailwind styles

server/
└── index.js           # Express API server
```

## 📡 API Endpoints

- `GET /api/data` - All database entries
- `GET /api/stats` - Aggregated statistics

## 🔧 Configuration

### API Server
Edit `server/index.js` to update:
- Notion API key
- Database IDs
- Port number

### UI Theme
Edit `tailwind.config.js` to customize:
- Colors
- Animations
- Typography

## 🚦 Development

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📊 Data Flow

1. **Notion Databases** → Store the source data
2. **Express API** → Fetches and transforms data
3. **React Context** → Manages application state
4. **Components** → Display and interact with data

## 🎯 Future Enhancements

- [ ] Real map integration (Mapbox/Leaflet)
- [ ] User authentication
- [ ] Edit capabilities
- [ ] Advanced analytics
- [ ] Data comparison tools
- [ ] Mobile app version
- [ ] Offline support
- [ ] Multi-language support

## 🛠️ Troubleshooting

### "Failed to load data"
Ensure the API server is running on port 3001:
```bash
cd server && npm install && npm start
```

### CORS errors
The server includes CORS middleware. If issues persist, check browser console.

### Performance
For large datasets, consider:
- Implementing virtual scrolling
- Adding data caching
- Optimizing API queries

## 📝 Notes

- All data is fetched from Notion in real-time
- The UI updates every 5 minutes automatically
- Charts are interactive - hover for details
- Tables support multi-column sorting

---

Built with respect for Indigenous data sovereignty 🙏