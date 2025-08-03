const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function createDatabase() {
  try {
    // Create the database
    const response = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: '244c6f799a338020999ae6bd4a636311' // From your URL
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'Vancouver Island First Nations',
          },
        },
      ],
      properties: {
        'Nation Name': {
          title: {},
        },
        'Traditional Name': {
          rich_text: {},
        },
        'Cultural Group': {
          select: {
            options: [
              { name: 'Coast Salish', color: 'blue' },
              { name: 'Nuu-chah-nulth', color: 'green' },
              { name: 'Kwakwaka\'wakw', color: 'purple' },
              { name: 'Other', color: 'gray' }
            ],
          },
        },
        'Language Family': {
          rich_text: {},
        },
        'Traditional Territory': {
          rich_text: {},
        },
        'Coordinates': {
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
        'Population': {
          number: {
            format: 'number',
          },
        },
        'Governance Type': {
          multi_select: {
            options: [
              { name: 'Elected Chief and Council', color: 'blue' },
              { name: 'Hereditary Chiefs', color: 'green' },
              { name: 'Traditional Governance', color: 'purple' },
              { name: 'Self-Government Agreement', color: 'orange' },
              { name: 'Treaty', color: 'red' }
            ],
          },
        },
        'Chief Councillor': {
          rich_text: {},
        },
        'History Overview': {
          rich_text: {},
        },
        'Cultural Highlights': {
          rich_text: {},
        },
        'Current Initiatives': {
          rich_text: {},
        },
        'Treaties/Agreements': {
          multi_select: {
            options: [
              { name: 'Douglas Treaty', color: 'blue' },
              { name: 'Modern Treaty', color: 'green' },
              { name: 'Self-Government Agreement', color: 'purple' },
              { name: 'Reconciliation Agreement', color: 'orange' },
              { name: 'Other Agreement', color: 'yellow' },
              { name: 'No Treaty', color: 'gray' }
            ],
          },
        },
        'Treaty Details': {
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

    console.log('Database created successfully!');
    console.log('Database ID:', response.id);
    console.log('Database URL:', response.url);
    
    return response;
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
}

// Run the function
createDatabase()
  .then(result => {
    console.log('Success! Database created.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create database:', error);
    process.exit(1);
  });