const { Client } = require('@notionhq/client');
const fs = require('fs').promises;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = '244c6f799a3381a9a757f86ab90ec3f6';

// Parse the research data into structured entries
const iwiData = [
  // Northland / Te Tai Tokerau
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāpuhi' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Hokianga Harbour to Bay of Islands, south to Whangārei' } }] },
    'Registered Population': { number: 184470 },
    'Major Hapū': { rich_text: [{ text: { content: '150 hapū' } }] },
    'Number of Marae': { number: 55 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Te Rūnanga ā Iwi o Ngāpuhi' } }] },
    'Physical Address': { rich_text: [{ text: { content: 'PO Box 263, Kaikohe 0405' } }] },
    'Official Website': { url: 'https://ngapuhi.iwi.nz' },
    'Treaty Settlement': { select: { name: 'In Negotiation' } },
    'Notes': { rich_text: [{ text: { content: 'Largest iwi in New Zealand by population' } }] },
    'Status': { select: { name: 'Complete' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Te Kāhui Māngai (Te Puni Kōkiri)\nURL: https://www.tkm.govt.nz\nDate accessed: 2025-08-03\n\nSource: Te Rūnanga ā Iwi o Ngāpuhi\nURL: https://ngapuhi.iwi.nz\nDate accessed: 2025-08-03\n\nSource: Stats NZ 2023 Census\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Aupōuri' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Far North region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Māmari, Ngātokimatawhaorua' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Kuri' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Far North region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Kurahaupō' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Kahu' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Far North region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Mamaru' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Rarawa' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Far North region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Tinana, Māhuhu-ki-te-rangi, Māmari, Ngātokimatawhaorua' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāi Takoto' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Far North region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Kurahaupō' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngātiwai' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Ngāti Wai' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Eastern Northland coastal area' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Whātua' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'Kaipara and surrounding areas' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // Auckland / Tāmaki Makaurau
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Whātua-o-Ōrākei' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'Central Auckland' } }] },
    'Notes': { rich_text: [{ text: { content: 'One of six original Auckland iwi' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Pāoa' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'Hauraki Gulf and Auckland isthmus' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāi Tai ki Tāmaki' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'Eastern Auckland' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Wai-o-Hua' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'Central Auckland' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'from Ngā Oho' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Te Ata' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'South Auckland' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Te Kawerau-a-Maki' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Te Kawerau ā Maki' } }] },
    'Region': { select: { name: 'Auckland/Tāmaki Makaurau' } },
    'Rohe': { rich_text: [{ text: { content: 'West Auckland' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  
  // Key data-rich entries
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Porou' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: 'Pōtikirua to Te Toka-a-Taiau' } }] },
    'Registered Population': { number: 102480 },
    'Major Hapū': { rich_text: [{ text: { content: '58 hapū' } }] },
    'Number of Marae': { number: 48 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Te Rūnanganui o Ngāti Porou Trust' } }] },
    'Official Website': { url: 'https://www.ngatiporou.com' },
    'Notes': { rich_text: [{ text: { content: 'Second largest iwi by population' } }] },
    'Status': { select: { name: 'Complete' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Te Rūnanganui o Ngāti Porou\nURL: https://www.ngatiporou.com\nDate accessed: 2025-08-03\n\nSource: Stats NZ 2023 Census\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Kahungunu' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: "Hawke's Bay and Wairarapa" } }] },
    'Registered Population': { number: 95751 },
    'Notes': { rich_text: [{ text: { content: 'Third largest iwi by population' } }] },
    'Status': { select: { name: 'Complete' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Stats NZ 2023 Census\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Waikato-Tainui' } }] },
    'Region': { select: { name: 'Waikato' } },
    'Rohe': { rich_text: [{ text: { content: 'Waikato River region' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Waka: Tainui' } }] },
    'Treaty Settlement': { select: { name: 'Settled' } },
    'Settlement Date': { date: { start: '1995-05-22' } },
    'Settlement Value': { rich_text: [{ text: { content: 'First major settlement: $170m (value in 2022: ~$312m)' } }] },
    'Notes': { rich_text: [{ text: { content: 'First iwi to settle (1995), major confederation' } }] },
    'Status': { select: { name: 'Complete' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: NZ Research Agent Comprehensive Data\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāi Tūhoe' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Tūhoe' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Te Urewera region' } }] },
    'Official Website': { url: 'https://www.ngaituhoe.iwi.nz' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Ngāi Tūhoe website\nURL: https://www.ngaituhoe.iwi.nz\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Awa' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Eastern Bay of Plenty' } }] },
    'Official Website': { url: 'https://www.ngatiawa.iwi.nz' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Ngāti Awa website\nURL: https://www.ngatiawa.iwi.nz\nDate accessed: 2025-08-03' } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Toa Rangatira' } }] },
    'Region': { select: { name: 'Wellington/Te Whanganui-a-Tara' } },
    'Rohe': { rich_text: [{ text: { content: 'Porirua and Kapiti Coast' } }] },
    'Official Website': { url: 'https://www.ngatitoa.iwi.nz' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: '2025-08-03' } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Ngāti Toa website\nURL: https://www.ngatitoa.iwi.nz\nDate accessed: 2025-08-03' } }] }
  },
  
  // More entries to be added in batches
];

// Import function
async function importIwiData() {
  console.log(`Starting import of ${iwiData.length} iwi entries...`);
  
  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };
  
  for (const iwi of iwiData) {
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
    totalEntries: iwiData.length,
    results: results,
    dataSource: 'NZ Research Agent Comprehensive Data 2025-08-03'
  };
  
  // Save report
  await fs.writeFile(
    `./infrastructure/reports/nz_import_${Date.now()}.json`,
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n=== Import Summary ===');
  console.log(`Total entries: ${iwiData.length}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success rate: ${((results.successful / iwiData.length) * 100).toFixed(2)}%`);
  
  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(e => console.log(`- ${e.iwi}: ${e.error}`));
  }
  
  return report;
}

// Run the import
importIwiData()
  .then(() => console.log('\nImport complete!'))
  .catch(console.error);