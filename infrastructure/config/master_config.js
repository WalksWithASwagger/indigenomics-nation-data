module.exports = {
  // Notion Configuration
  notion: {
    apiKey: process.env.NOTION_API_KEY,
    databases: {
      // Production databases by region
      production: {
        northAmerica: {
          vancouverIsland: '244c6f799a33814ca939e50e5260e8f7',
          // Add more as created
        },
        oceania: {
          newZealand: '244c6f799a3381a9a757f86ab90ec3f6',
          // australia: 'database_id_here',
        },
        // Add more regions
      },
      // Staging databases
      staging: {
        global: 'STAGING_DB_ID', // Create this in Notion
      },
      // Archive databases
      archive: {
        global: 'ARCHIVE_DB_ID', // Create this in Notion
      }
    }
  },

  // Regional Configurations
  regions: {
    northAmerica: {
      canada: {
        provinces: ['british-columbia', 'alberta', 'saskatchewan', 'manitoba', 'ontario', 'quebec', 'newfoundland', 'nova-scotia', 'new-brunswick', 'pei', 'yukon', 'northwest-territories', 'nunavut'],
        indigenousGroups: ['first-nations', 'inuit', 'metis'],
        languages: ['algonquian', 'iroquoian', 'siouan', 'salishan', 'athabaskan', 'inuktitut', 'michif']
      },
      usa: {
        regions: ['northeast', 'southeast', 'midwest', 'southwest', 'west', 'alaska', 'hawaii'],
        // Add specific configurations
      },
      mexico: {
        // Add configurations
      }
    },
    oceania: {
      newZealand: {
        regions: ['northland', 'auckland', 'waikato', 'bay-of-plenty', 'east-coast', 'taranaki', 'manawatu-whanganui', 'wellington', 'nelson-marlborough', 'west-coast', 'canterbury', 'otago', 'southland'],
        indigenousGroups: ['iwi', 'hapu', 'whanau'],
        languages: ['te-reo-maori']
      },
      australia: {
        states: ['nsw', 'victoria', 'queensland', 'wa', 'sa', 'tasmania', 'nt', 'act'],
        indigenousGroups: ['aboriginal', 'torres-strait-islander'],
        // Add language families
      },
      pacific: {
        // Fiji, Papua New Guinea, etc.
      }
    },
    southAmerica: {
      // Brazil, Peru, Colombia, etc.
    },
    africa: {
      // By country/region
    },
    asia: {
      // By country/region
    },
    europe: {
      // Sami, etc.
    }
  },

  // Workflow Configuration
  workflows: {
    validation: {
      requiredFields: {
        universal: ['name', 'region', 'territory', 'data_sources', 'last_verified'],
        optional: ['traditional_name', 'population', 'language', 'website']
      },
      qualityThresholds: {
        minimum: 70,
        preferred: 85,
        excellent: 95
      }
    },
    review: {
      stages: ['initial', 'cultural_sensitivity', 'accuracy', 'final'],
      reviewers: {
        // Add reviewer assignments by region
      }
    },
    monitoring: {
      sourceCheck: {
        interval: 7 * 24 * 60 * 60 * 1000, // Weekly
        retryAttempts: 3
      },
      dataVerification: {
        interval: 90 * 24 * 60 * 60 * 1000, // Quarterly
      }
    }
  },

  // Field Mappings
  fieldMappings: {
    // Map research agent fields to database fields
    universal: {
      'name': ['name', 'group_name', 'title', 'primary_name'],
      'traditional_name': ['traditional_name', 'indigenous_name', 'native_name'],
      'territory': ['territory', 'traditional_territory', 'location', 'lands'],
      'population': ['population', 'members', 'registered_population', 'citizens'],
      'language': ['language', 'language_family', 'languages_spoken'],
      'website': ['website', 'official_website', 'url', 'web'],
      'email': ['email', 'contact_email', 'official_email'],
      'phone': ['phone', 'contact_phone', 'telephone']
    },
    regional: {
      canada: {
        'band_number': ['band_number', 'band_id'],
        'treaty': ['treaty', 'treaties', 'agreements']
      },
      newZealand: {
        'iwi': ['iwi', 'tribe'],
        'hapu': ['hapu', 'sub_tribe', 'subtribe'],
        'rohe': ['rohe', 'territory', 'boundaries'],
        'whakapapa': ['whakapapa', 'genealogy', 'ancestry']
      }
    }
  },

  // Research Agent Integration
  researchAgents: {
    inputFormats: ['json', 'csv', 'markdown'],
    outputPath: './staging/research_output',
    templates: {
      comprehensive: './infrastructure/templates/research_intake_template.json',
      simple: './infrastructure/templates/simple_intake_template.json'
    }
  },

  // Automation Settings
  automation: {
    enabled: true,
    batchSize: 50,
    processingSchedule: '0 2 * * *', // 2 AM daily
    notifications: {
      email: process.env.ADMIN_EMAIL,
      slack: process.env.SLACK_WEBHOOK
    }
  },

  // API Configuration
  api: {
    rateLimit: {
      notion: {
        requestsPerSecond: 3,
        retryDelay: 1000
      }
    },
    endpoints: {
      // Future API endpoints for research agents
      submit: '/api/research/submit',
      status: '/api/research/status/:id',
      validate: '/api/validate'
    }
  },

  // Storage Configuration
  storage: {
    local: {
      staging: './staging',
      archive: './archives',
      reports: './infrastructure/reports',
      logs: './logs'
    },
    backup: {
      enabled: true,
      schedule: '0 3 * * 0', // Weekly at 3 AM Sunday
      retention: 90 // days
    }
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    files: {
      error: './logs/error.log',
      combined: './logs/combined.log',
      workflow: './logs/workflow.log'
    }
  }
};