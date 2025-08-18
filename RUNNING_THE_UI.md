# 🚀 Running the Indigenous Peoples Database UI

## Quick Start (Recommended)

From the main project directory:

```bash
cd indigenous-peoples-ui
npm start
```

This will:
1. Install server dependencies
2. Start the API server on http://localhost:3001
3. Start the React UI on http://localhost:5173

Open your browser to **http://localhost:5173**

## Manual Start (If needed)

### Terminal 1 - API Server
```bash
cd indigenous-peoples-ui/server
npm install
npm start
```

### Terminal 2 - React UI
```bash
cd indigenous-peoples-ui
npm install
npm run dev
```

## What You'll See

### 1. Dashboard (Home)
- **Live Statistics**: Total groups, regional breakdowns
- **Animated Numbers**: Watch the counts animate on load
- **Data Quality Circles**: Visual progress indicators
- **Recent Entries**: Latest additions from each region

### 2. Data Explorer
- **Search Bar**: Type to search across all fields
- **Filters**: Region (All/Vancouver Island/New Zealand) and Status
- **Sortable Columns**: Click headers to sort
- **Export Button**: Download current view as CSV
- **Pagination**: Navigate through pages of data

### 3. Analytics
- **Interactive Charts**:
  - Status distribution pie chart
  - Regional bar chart
  - Top 10 by population
  - Data quality trend line
- **Summary Cards**: Growth rate, average population, coverage
- **Key Insights**: Automated analysis

### 4. Map View
- Placeholder for future geographic visualization
- Shows regional summaries and territory lists

## Features to Try

1. **Search**: Try searching for "Ngāpuhi" or "Cowichan"
2. **Sort**: Click the "Population" header to sort by size
3. **Filter**: Select "Complete" status to see finished entries
4. **Hover**: Mouse over charts for detailed tooltips
5. **Export**: Download filtered data as CSV
6. **Animations**: Refresh the page to see loading animations

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Change this hex code
    600: '#2563eb',  // And this one
  }
}
```

### Adjust Animation Speed
In component files, look for:
```javascript
transition={{ duration: 0.5 }}  // Change duration
```

### Modify API Endpoint
Edit `src/context/DataContext.jsx`:
```javascript
axios.get('http://localhost:3001/api/data')  // Change URL
```

## Troubleshooting

### "Cannot connect to server"
Make sure the API server is running on port 3001

### Blank data
Check that your Notion API key is correct in `server/index.js`

### Slow performance
The app fetches all data on load. For production, implement pagination on the API level.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express.js + Notion API
- **State**: React Context API

---

Enjoy exploring your Indigenous Peoples Database with this beautiful, animated UI! 🎉