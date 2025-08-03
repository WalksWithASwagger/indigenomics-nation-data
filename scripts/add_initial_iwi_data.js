const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = '244c6f799a3381a9a757f86ab90ec3f6';

// Sample data for major iwi from different regions
const initialIwi = [
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāpuhi' } }] },
    'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
    'Rohe': { rich_text: [{ text: { content: 'From Hokianga to Bay of Islands, including Whangārei' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Descended from Rāhiri through Uenuku and Kaharau' } }] },
    'Registered Population': { number: 125601 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Te Rūnanga-Ā-Iwi O Ngāpuhi' } }] },
    'Official Website': { url: 'http://www.ngapuhi.iwi.nz/' },
    'Treaty Settlement': { select: { name: 'In Negotiation' } },
    'Major Landmarks': { rich_text: [{ text: { content: 'Maunga: Maungataniwha, Awa: Hokianga' } }] },
    'Notes': { rich_text: [{ text: { content: 'Largest iwi in New Zealand by population' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Te Rūnanga-Ā-Iwi O Ngāpuhi website\nURL: http://www.ngapuhi.iwi.nz/\nCensus 2018 data\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāi Tahu' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Kāi Tahu (southern dialect)' } }] },
    'Region': { select: { name: 'Canterbury/Waitaha' } },
    'Rohe': { rich_text: [{ text: { content: 'Most of South Island - from Nelson to Stewart Island' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Descended from Tahu Pōtiki' } }] },
    'Registered Population': { number: 74082 },
    'Number of Marae': { number: 18 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Te Rūnanga o Ngāi Tahu' } }] },
    'Official Website': { url: 'https://ngaitahu.iwi.nz/' },
    'Treaty Settlement': { select: { name: 'Settled' } },
    'Settlement Date': { date: { start: '1998-11-21' } },
    'Settlement Value': { rich_text: [{ text: { content: '$170 million plus other redress' } }] },
    'Major Landmarks': { rich_text: [{ text: { content: 'Maunga: Aoraki/Mt Cook, Awa: Clutha/Mata-Au, Waitaki' } }] },
    'Dialect Variations': { rich_text: [{ text: { content: 'Southern dialect: k replaces ng (e.g., Kāi Tahu not Ngāi Tahu)' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Te Rūnanga o Ngāi Tahu website\nURL: https://ngaitahu.iwi.nz/\nCensus 2018 data\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Ngāti Kahungunu' } }] },
    'Region': { select: { name: 'East Coast/Te Tai Rāwhiti' } },
    'Rohe': { rich_text: [{ text: { content: 'Hawke\'s Bay region from Wairoa to Wairarapa' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Descended from Kahungunu' } }] },
    'Registered Population': { number: 82239 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Ngāti Kahungunu Iwi Incorporated' } }] },
    'Official Website': { url: 'https://www.kahungunu.iwi.nz/' },
    'Treaty Settlement': { select: { name: 'In Negotiation' } },
    'Major Landmarks': { rich_text: [{ text: { content: 'Maunga: Te Mata Peak, Awa: Tukituki, Ngaruroro' } }] },
    'Notes': { rich_text: [{ text: { content: 'Second largest iwi by population' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Ngāti Kahungunu Iwi Inc website\nURL: https://www.kahungunu.iwi.nz/\nCensus 2018 data\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Waikato-Tainui' } }] },
    'Region': { select: { name: 'Waikato' } },
    'Rohe': { rich_text: [{ text: { content: 'Waikato River region, Hamilton to Port Waikato' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Tainui waka' } }] },
    'Registered Population': { number: 76734 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Waikato-Tainui Te Kauhanganui Inc' } }] },
    'Official Website': { url: 'https://www.waikatotainui.com/' },
    'Treaty Settlement': { select: { name: 'Settled' } },
    'Settlement Date': { date: { start: '1995-05-22' } },
    'Settlement Value': { rich_text: [{ text: { content: '$170 million land and cash' } }] },
    'Major Landmarks': { rich_text: [{ text: { content: 'Awa: Waikato River, Maunga: Taupiri' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Waikato-Tainui website\nURL: https://www.waikatotainui.com/\nCensus 2018 data\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Iwi Name': { title: [{ text: { content: 'Tūhoe' } }] },
    'Alternative Names': { rich_text: [{ text: { content: 'Ngāi Tūhoe' } }] },
    'Region': { select: { name: 'Bay of Plenty/Te Moana-a-Toi' } },
    'Rohe': { rich_text: [{ text: { content: 'Te Urewera - inland Bay of Plenty' } }] },
    'Whakapapa': { rich_text: [{ text: { content: 'Descended from Tūhoe-pōtiki' } }] },
    'Registered Population': { number: 37638 },
    'Rūnanga/Trust': { rich_text: [{ text: { content: 'Te Uru Taumatua' } }] },
    'Official Website': { url: 'https://www.ngaituhoe.iwi.nz/' },
    'Treaty Settlement': { select: { name: 'Settled' } },
    'Settlement Date': { date: { start: '2013-06-04' } },
    'Major Landmarks': { rich_text: [{ text: { content: 'Te Urewera (formerly national park), Lake Waikaremoana' } }] },
    'Notes': { rich_text: [{ text: { content: 'Known as "Children of the Mist"' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Ngāi Tūhoe website\nURL: https://www.ngaituhoe.iwi.nz/\nCensus 2018 data\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  }
];

async function addInitialIwiData() {
  console.log('Adding initial iwi data to the database...');
  
  for (const iwi of initialIwi) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: iwi
      });
      console.log(`Added: ${iwi['Iwi Name'].title[0].text.content}`);
    } catch (error) {
      console.error(`Error adding ${iwi['Iwi Name'].title[0].text.content}:`, error.message);
    }
  }
  
  console.log('Initial iwi data added successfully!');
}

// Create a template entry
async function createIwiTemplate() {
  try {
    const templateEntry = {
      'Iwi Name': { title: [{ text: { content: '[Template] New Iwi Entry' } }] },
      'Alternative Names': { rich_text: [{ text: { content: '[Historical or alternative names]' } }] },
      'Region': { select: { name: 'Northland/Te Tai Tokerau' } },
      'Rohe': { rich_text: [{ text: { content: '[Traditional territory boundaries]' } }] },
      'Whakapapa': { rich_text: [{ text: { content: '[Founding ancestor/genealogy]' } }] },
      'Major Hapū': { rich_text: [{ text: { content: '[List major hapū/sub-tribes]' } }] },
      'Rūnanga/Trust': { rich_text: [{ text: { content: '[Official governance entity]' } }] },
      'Major Landmarks': { rich_text: [{ text: { content: 'Maunga: [Mountain], Awa: [River]' } }] },
      'Current Initiatives': { rich_text: [{ text: { content: '[Current programs and projects]' } }] },
      'Resources/Links': { rich_text: [{ text: { content: '[Additional resources]' } }] },
      'Status': { select: { name: 'Not Started' } },
      'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
      'Data Sources': { rich_text: [{ text: { content: 'Source: [Website/Document Name]\nURL: [link]\nDate accessed: [YYYY-MM-DD]' } }] },
      'Notes': { rich_text: [{ text: { content: 'TEMPLATE ENTRY - Duplicate this to create new entries' } }] }
    };
    
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: templateEntry
    });
    console.log('Iwi template entry created successfully!');
  } catch (error) {
    console.error('Error creating template:', error);
  }
}

// Run both functions
async function main() {
  await addInitialIwiData();
  await createIwiTemplate();
  console.log('\nMāori Iwi database setup complete!');
  console.log('Database URL: https://www.notion.so/' + databaseId);
}

main().catch(console.error);