import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'your-api-key-here',
});

// Database IDs
const DATABASES = {
  vancouverIsland: '244c6f799a33814ca939e50e5260e8f7',
  newZealand: '244c6f799a3381a9a757f86ab90ec3f6'
};

// Get all data from both databases
app.get('/api/data', async (req, res) => {
  try {
    const [vancouverData, nzData] = await Promise.all([
      getDatabaseData(DATABASES.vancouverIsland, 'vancouverIsland'),
      getDatabaseData(DATABASES.newZealand, 'newZealand')
    ]);

    const combined = {
      vancouverIsland: vancouverData,
      newZealand: nzData,
      total: vancouverData.length + nzData.length,
      lastUpdated: new Date().toISOString()
    };

    res.json(combined);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const [vancouverData, nzData] = await Promise.all([
      getDatabaseData(DATABASES.vancouverIsland, 'vancouverIsland'),
      getDatabaseData(DATABASES.newZealand, 'newZealand')
    ]);

    const stats = {
      total: vancouverData.length + nzData.length,
      byRegion: {
        vancouverIsland: {
          total: vancouverData.length,
          byStatus: getStatusCounts(vancouverData),
          byCulturalGroup: getCulturalGroupCounts(vancouverData)
        },
        newZealand: {
          total: nzData.length,
          byStatus: getStatusCounts(nzData),
          byRegion: getRegionCounts(nzData)
        }
      },
      dataQuality: {
        withWebsites: [...vancouverData, ...nzData].filter(item => item.website).length,
        withPopulation: [...vancouverData, ...nzData].filter(item => item.population).length,
        complete: [...vancouverData, ...nzData].filter(item => item.status === 'Complete').length
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Helper function to get data from a database
async function getDatabaseData(databaseId, type) {
  const pages = [];
  let hasMore = true;
  let startCursor;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      page_size: 100
    });

    pages.push(...response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  return pages.map(page => parseNotionPage(page, type));
}

// Parse Notion page data into a cleaner format
function parseNotionPage(page, type) {
  const props = page.properties;
  
  if (type === 'vancouverIsland') {
    return {
      id: page.id,
      type: 'firstNation',
      name: getTextFromProperty(props['Nation Name']),
      traditionalName: getTextFromProperty(props['Traditional Name']),
      culturalGroup: props['Cultural Group']?.select?.name || null,
      territory: getTextFromProperty(props['Traditional Territory']),
      population: props['Population']?.number || null,
      website: props['Official Website']?.url || null,
      status: props['Status']?.select?.name || 'Unknown',
      lastVerified: props['Last Verified']?.date?.start || null,
      coordinates: getTextFromProperty(props['Coordinates']),
      region: 'Vancouver Island'
    };
  } else {
    return {
      id: page.id,
      type: 'iwi',
      name: getTextFromProperty(props['Iwi Name']),
      traditionalName: getTextFromProperty(props['Alternative Names']),
      region: props['Region']?.select?.name || null,
      rohe: getTextFromProperty(props['Rohe']),
      population: props['Registered Population']?.number || null,
      website: props['Official Website']?.url || null,
      status: props['Status']?.select?.name || 'Unknown',
      lastVerified: props['Last Verified']?.date?.start || null,
      runanga: getTextFromProperty(props['Rūnanga/Trust']),
      treatySettlement: props['Treaty Settlement']?.select?.name || null
    };
  }
}

// Get text from Notion property
function getTextFromProperty(property) {
  if (!property) return null;
  
  if (property.title) {
    return property.title.map(t => t.plain_text).join('') || null;
  } else if (property.rich_text) {
    return property.rich_text.map(t => t.plain_text).join('') || null;
  }
  
  return null;
}

// Count helpers
function getStatusCounts(data) {
  const counts = {};
  data.forEach(item => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return counts;
}

function getCulturalGroupCounts(data) {
  const counts = {};
  data.forEach(item => {
    if (item.culturalGroup) {
      counts[item.culturalGroup] = (counts[item.culturalGroup] || 0) + 1;
    }
  });
  return counts;
}

function getRegionCounts(data) {
  const counts = {};
  data.forEach(item => {
    if (item.region) {
      counts[item.region] = (counts[item.region] || 0) + 1;
    }
  });
  return counts;
}

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});