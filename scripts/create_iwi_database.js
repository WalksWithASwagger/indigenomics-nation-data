const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function createIwiDatabase() {
  try {
    // Create the database
    const response = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: '244c6f799a338020999ae6bd4a636311' // Same page as Vancouver Island DB
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'New Zealand Māori Iwi',
          },
        },
      ],
      properties: {
        'Iwi Name': {
          title: {},
        },
        'Alternative Names': {
          rich_text: {},
        },
        'Region': {
          select: {
            options: [
              { name: 'Northland/Te Tai Tokerau', color: 'blue' },
              { name: 'Auckland/Tāmaki Makaurau', color: 'green' },
              { name: 'Waikato', color: 'purple' },
              { name: 'Bay of Plenty/Te Moana-a-Toi', color: 'yellow' },
              { name: 'East Coast/Te Tai Rāwhiti', color: 'orange' },
              { name: 'Taranaki', color: 'red' },
              { name: 'Manawatū-Whanganui', color: 'pink' },
              { name: 'Wellington/Te Whanganui-a-Tara', color: 'brown' },
              { name: 'Nelson/Whakatū', color: 'blue' },
              { name: 'Marlborough/Te Tau Ihu', color: 'green' },
              { name: 'West Coast/Te Tai Poutini', color: 'purple' },
              { name: 'Canterbury/Waitaha', color: 'yellow' },
              { name: 'Otago/Ōtākou', color: 'orange' },
              { name: 'Southland/Murihiku', color: 'red' },
              { name: 'Chatham Islands/Rēkohu', color: 'gray' }
            ],
          },
        },
        'Rohe': {
          rich_text: {},
        },
        'Whakapapa': {
          rich_text: {},
        },
        'Major Hapū': {
          rich_text: {},
        },
        'Number of Marae': {
          number: {
            format: 'number',
          },
        },
        'Registered Population': {
          number: {
            format: 'number',
          },
        },
        'Rūnanga/Trust': {
          rich_text: {},
        },
        'Official Website': {
          url: {},
        },
        'Contact Email': {
          email: {},
        },
        'Contact Phone': {
          phone_number: {},
        },
        'Physical Address': {
          rich_text: {},
        },
        'Treaty Settlement': {
          select: {
            options: [
              { name: 'Settled', color: 'green' },
              { name: 'In Negotiation', color: 'yellow' },
              { name: 'Pre-negotiation', color: 'orange' },
              { name: 'Not Started', color: 'red' },
              { name: 'N/A', color: 'gray' }
            ],
          },
        },
        'Settlement Date': {
          date: {},
        },
        'Settlement Value': {
          rich_text: {},
        },
        'Major Landmarks': {
          rich_text: {},
        },
        'Dialect Variations': {
          rich_text: {},
        },
        'Current Initiatives': {
          rich_text: {},
        },
        'Educational Institutions': {
          rich_text: {},
        },
        'Iwi Media': {
          rich_text: {},
        },
        'Economic Entities': {
          rich_text: {},
        },
        'Pepeha Template': {
          rich_text: {},
        },
        'Resources/Links': {
          rich_text: {},
        },
        'Data Sources': {
          rich_text: {},
        },
        'Last Verified': {
          date: {},
        },
        'Notes': {
          rich_text: {},
        },
        'Status': {
          select: {
            options: [
              { name: 'Not Started', color: 'gray' },
              { name: 'In Progress', color: 'yellow' },
              { name: 'Needs Verification', color: 'orange' },
              { name: 'Complete', color: 'green' },
              { name: 'Needs Update', color: 'red' }
            ],
          },
        },
      },
    });

    console.log('Iwi database created successfully!');
    console.log('Database ID:', response.id);
    console.log('Database URL:', response.url);
    
    return response;
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
}

// Run the function
createIwiDatabase()
  .then(result => {
    console.log('Success! Māori Iwi database created.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create database:', error);
    process.exit(1);
  });