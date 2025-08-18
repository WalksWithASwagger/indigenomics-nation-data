const { Client } = require('@notionhq/client');
const fs = require('fs').promises;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = '244c6f799a3381a9a757f86ab90ec3f6';

// Batch 2 - More iwi from the research
const iwiDataBatch2 = [
  // Waikato Region
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Maniapoto' } }] },
    'Region': { select: { name: 'Waikato' } },
    'Rohe': { rich_text: [{ text: { content: 'King Country region' } }] },
    'Notes': { rich_text: [{ text: { content: 'Part of Tainui confederation' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Raukawa' } }] },
    'Region': { select: { name: 'Waikato' } },
    'Rohe': { rich_text: [{ text: { content: 'Southern Waikato' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // Bay of Plenty
  {
    'Iwi Name': { title: [{ text: { content: 'Te Whakatōhea' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Ōpōtiki district' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Whānau-ā-Apanui' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Eastern Bay of Plenty' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāi Te Rangi' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Tauranga area' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Ranginui' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Western Bay of Plenty' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Pūkenga' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Tauranga district' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Arawa' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Rotorua lakes district' } }] },
    'Notes': { rich_text: [{ text: { content: 'Confederation with multiple hapū' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Waitaha' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Whakapapa': { rich_text: [{ text: { content: 'Descends from Arawa waka' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // East Coast
  {
    'Iwi Name': { title: [{ text: { content: 'Te Aitanga-a-Māhaki' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: 'Gisborne region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Rongowhakaata' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: 'Gisborne region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Aitanga-a-Hauiti' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: 'Uawa (Tolaga Bay) area' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // Taranaki
  {
    'Iwi Name': { title: [{ text: { content: 'Te Ātiawa' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Te Āti Awa' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Notes': { rich_text: [{ text: { content: 'Also in Wellington region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Taranaki' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'Mount Taranaki area' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Ruanui' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'South Taranaki' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāruahine' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'South Taranaki' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Mutunga' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'North Taranaki' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Tama' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'North Taranaki' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Maru' } }] },
    'Region': { select: { name: 'Taranaki' } },
    'Rohe': { rich_text: [{ text: { content: 'Taranaki region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Āti Haunui-a-Pāpārangi' } }] },
    'Region': { select: { name: 'Manawatū-Whanganui' } },
    'Rohe': { rich_text: [{ text: { content: 'Whanganui River' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // Wellington
  {
    'Iwi Name': { title: [{ text: { content: 'Te Ātiawa ki Whakarongotai' } }] },
    'Region': { select: { name: 'Wellington/Te Whanganui-a-Tara' } },
    'Rohe': { rich_text: [{ text: { content: 'Kapiti Coast' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Muaūpoko' } }] },
    'Region': { select: { name: 'Wellington/Te Whanganui-a-Tara' } },
    'Rohe': { rich_text: [{ text: { content: 'Horowhenua' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Rangitāne' } }] },
    'Region': { select: { name: 'Wellington/Te Whanganui-a-Tara' } },
    'Notes': { rich_text: [{ text: { content: 'Also in South Island' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // South Island
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Apa ki te Rā Tō' } }] },
    'Region': { select: { name: 'Marlborough/Te Tau Ihu' } },
    'Rohe': { rich_text: [{ text: { content: 'Marlborough region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Rangitāne o Wairau' } }] },
    'Region': { select: { name: 'Marlborough/Te Tau Ihu' } },
    'Rohe': { rich_text: [{ text: { content: 'Marlborough region' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  }
];

// Import function
async function importBatch2() {
  console.log(`Starting import of ${iwiDataBatch2.length} additional iwi entries...`);
  
  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };
  
  for (const iwi of iwiDataBatch2) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: iwi
      });
      console.log(`✓ Added: ${iwi['Iwi Name'].title[0].text.content}`);
      results.successful++;
    } catch (error) {
      console.error(`✗ Failed: ${iwi['Iwi Name'].title[0].text.content} - ${error.message}`);
      results.failed++;
      results.errors.push({
        iwi: iwi['Iwi Name'].title[0].text.content,
        error: error.message
      });
    }
  }
  
  // Generate report
  const report = {
    importDate: new Date().toISOString(),
    databaseId: databaseId,
    batch: 2,
    totalEntries: iwiDataBatch2.length,
    results: results,
    dataSource: 'NZ Research Agent Comprehensive Data 2025-08-03'
  };
  
  // Save report
  await fs.writeFile(
    `./infrastructure/reports/nz_import_batch2_${Date.now()}.json`,
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n=== Import Summary (Batch 2) ===');
  console.log(`Total entries: ${iwiDataBatch2.length}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success rate: ${((results.successful / iwiDataBatch2.length) * 100).toFixed(2)}%`);
  
  return report;
}

// Run the import
importBatch2()
  .then(() => console.log('\nBatch 2 import complete!'))
  .catch(console.error);