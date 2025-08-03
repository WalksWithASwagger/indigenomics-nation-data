const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = '244c6f799a33814ca939e50e5260e8f7';

// Sample data for first few nations to get started
const initialNations = [
  {
    'Nation Name': { title: [{ text: { content: 'Tsartlip First Nation' } }] },
    'Traditional Name': { rich_text: [{ text: { content: 'WJOȽEȽP' } }] },
    'Cultural Group': { select: { name: 'Coast Salish' } },
    'Language Family': { rich_text: [{ text: { content: 'Salishan - SENĆOŦEN' } }] },
    'Traditional Territory': { rich_text: [{ text: { content: 'Saanich Peninsula, Southern Gulf Islands' } }] },
    'Official Website': { url: 'https://tsartlip.com/' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Official Tsartlip First Nation website\nURL: https://tsartlip.com/\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Nation Name': { title: [{ text: { content: 'Songhees Nation' } }] },
    'Traditional Name': { rich_text: [{ text: { content: 'Lekwungen' } }] },
    'Cultural Group': { select: { name: 'Coast Salish' } },
    'Language Family': { rich_text: [{ text: { content: 'Salishan - Lekwungen' } }] },
    'Traditional Territory': { rich_text: [{ text: { content: 'Victoria area, Southern Vancouver Island' } }] },
    'Official Website': { url: 'https://www.songheesnation.ca/' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Official Songhees Nation website\nURL: https://www.songheesnation.ca/\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Nation Name': { title: [{ text: { content: 'Cowichan Tribes' } }] },
    'Traditional Name': { rich_text: [{ text: { content: 'Quw\'utsun' } }] },
    'Cultural Group': { select: { name: 'Coast Salish' } },
    'Language Family': { rich_text: [{ text: { content: 'Salishan - Hul\'qumi\'num' } }] },
    'Traditional Territory': { rich_text: [{ text: { content: 'Cowichan Valley, Duncan area' } }] },
    'Official Website': { url: 'https://cowichantribes.com/' },
    'Notes': { rich_text: [{ text: { content: 'Largest First Nation in British Columbia' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Official Cowichan Tribes website\nURL: https://cowichantribes.com/\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Nation Name': { title: [{ text: { content: 'Ahousaht First Nation' } }] },
    'Cultural Group': { select: { name: 'Nuu-chah-nulth' } },
    'Traditional Territory': { rich_text: [{ text: { content: 'Clayoquot Sound, West Coast Vancouver Island' } }] },
    'Notes': { rich_text: [{ text: { content: 'Largest Nuu-chah-nulth nation' } }] },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Public records\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  },
  {
    'Nation Name': { title: [{ text: { content: '\'Namgis First Nation' } }] },
    'Cultural Group': { select: { name: 'Kwakwaka\'wakw' } },
    'Traditional Territory': { rich_text: [{ text: { content: 'Alert Bay, North Vancouver Island' } }] },
    'Official Website': { url: 'https://www.namgis.bc.ca/' },
    'Status': { select: { name: 'In Progress' } },
    'Last Verified': { date: { start: new Date().toISOString().split('T')[0] } },
    'Data Sources': { rich_text: [{ text: { content: 'Source: Official \'Namgis First Nation website\nURL: https://www.namgis.bc.ca/\nDate accessed: ' + new Date().toISOString().split('T')[0] } }] }
  }
];

async function addInitialData() {
  console.log('Adding initial data to the database...');
  
  for (const nation of initialNations) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: nation
      });
      console.log(`Added: ${nation['Nation Name'].title[0].text.content}`);
    } catch (error) {
      console.error(`Error adding ${nation['Nation Name'].title[0].text.content}:`, error.message);
    }
  }
  
  console.log('Initial data added successfully!');
}

// Create a template entry
async function createTemplate() {
  try {
    const templateEntry = {
      'Nation Name': { title: [{ text: { content: '[Template] New First Nation Entry' } }] },
      'Traditional Name': { rich_text: [{ text: { content: '[Traditional name in Indigenous language]' } }] },
      'Cultural Group': { select: { name: 'Coast Salish' } },
      'Language Family': { rich_text: [{ text: { content: '[Language family and dialect]' } }] },
      'Traditional Territory': { rich_text: [{ text: { content: '[Description of traditional territory]' } }] },
      'Coordinates': { rich_text: [{ text: { content: '[latitude, longitude]' } }] },
      'Official Website': { url: null },
      'Contact Email': { email: null },
      'Contact Phone': { phone_number: null },
      'History Overview': { rich_text: [{ text: { content: '[Brief respectful history from Indigenous perspective]' } }] },
      'Cultural Highlights': { rich_text: [{ text: { content: '[Public cultural information]' } }] },
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
    console.log('Template entry created successfully!');
  } catch (error) {
    console.error('Error creating template:', error);
  }
}

// Run both functions
async function main() {
  await addInitialData();
  await createTemplate();
  console.log('\nDatabase setup complete!');
  console.log('Database URL: https://www.notion.so/' + databaseId);
}

main().catch(console.error);