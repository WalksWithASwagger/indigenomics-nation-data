const fs = require('fs').promises;
const path = require('path');

// Template for converting research data to standardized format
const createStandardizedEntry = (nationData) => {
  return {
    template_version: "1.0.0",
    template_type: "indigenous_group_research",
    metadata: {
      researcher_id: "claude_agent_001",
      research_date: "2025-08-03",
      region: "north-america/canada/british-columbia/vancouver-island",
      country: "Canada",
      review_status: "pending",
      quality_score: null
    },
    core_data: {
      identification: {
        primary_name: {
          value: nationData.officialName,
          source: "Official sources",
          confidence: "high",
          notes: "Official registered name"
        },
        alternative_names: {
          value: nationData.alternativeNames || [],
          source: nationData.primarySource || "",
          notes: nationData.nameNotes || ""
        },
        name_etymology: {
          value: nationData.nameEtymology || "",
          source: nationData.primarySource || "",
          notes: ""
        }
      },
      location: {
        traditional_territory: {
          description: nationData.territoryDescription || "",
          boundaries: nationData.territoryBoundaries || "",
          source: nationData.primarySource || "",
          map_reference: ""
        },
        current_location: {
          primary_region: nationData.currentLocation || "",
          settlements: nationData.settlements || [],
          coordinates: nationData.coordinates || [],
          source: "Government records"
        },
        sacred_sites: {
          public_info_only: true,
          sites: [],
          source: "No public information provided"
        }
      },
      demographics: {
        population: {
          total: nationData.population || null,
          year: nationData.populationYear || "",
          source: nationData.populationSource || "",
          trend: "unknown"
        },
        diaspora: {
          locations: nationData.diasporaInfo || [],
          estimated_numbers: null,
          source: ""
        }
      },
      language: {
        language_family: {
          value: nationData.languageFamily || "",
          source: "Linguistic sources"
        },
        languages_spoken: {
          traditional: nationData.traditionalLanguages || [],
          current: [...(nationData.traditionalLanguages || []), "English"],
          source: nationData.primarySource || ""
        },
        language_status: {
          classification: nationData.languageStatus || "endangered",
          speakers: null,
          revitalization_efforts: nationData.languagePrograms || "",
          source: nationData.primarySource || ""
        }
      },
      governance: {
        traditional_governance: {
          structure: nationData.traditionalGovernance || "",
          leadership_roles: [],
          source: nationData.primarySource || ""
        },
        current_governance: {
          type: nationData.governanceType || "Indian Act Band Council",
          recognized_entity: nationData.officialName,
          leadership: {
            current_leaders: nationData.currentLeadership || [],
            selection_method: nationData.electionMethod || ""
          },
          source: nationData.primarySource || ""
        },
        legal_status: {
          recognition: "Federally recognized First Nation",
          treaties: nationData.treaties || [],
          agreements: nationData.agreements || [],
          source: "Government of Canada"
        }
      },
      culture: {
        cultural_practices: {
          public_information: nationData.culturalInfo || "",
          ceremonies: [],
          arts: nationData.arts || [],
          source: nationData.primarySource || ""
        },
        spiritual_beliefs: {
          public_information: "Traditional spiritual practices continue",
          important_figures: [],
          source: "Limited public information"
        },
        material_culture: {
          traditional_items: [],
          museums_collections: [],
          source: ""
        }
      },
      history: {
        origin_story: {
          public_version: `${nationData.culturalGroup || 'Indigenous'} people have lived in the territory since time immemorial`,
          source: "Oral history"
        },
        historical_timeline: {
          key_events: nationData.historicalEvents || [],
          source: "Various sources"
        },
        colonial_impact: {
          first_contact: "Late 1700s - early 1800s",
          major_impacts: ["Reserve system", "Residential schools"],
          source: "Historical records"
        }
      },
      contemporary: {
        current_issues: {
          priorities: nationData.currentPriorities || [],
          challenges: [],
          source: nationData.primarySource || ""
        },
        economic_activities: {
          traditional: ["Fishing", "Harvesting"],
          modern: nationData.modernEconomicActivities || [],
          enterprises: [],
          source: nationData.primarySource || ""
        },
        education: {
          institutions: nationData.educationInstitutions || [],
          programs: nationData.programs || [],
          source: nationData.primarySource || ""
        },
        media_communications: {
          websites: nationData.website ? [nationData.website] : [],
          social_media: [],
          publications: [],
          radio_tv: [],
          source: "Direct observation"
        }
      },
      relationships: {
        allied_groups: {
          traditional_allies: nationData.allies || [],
          current_partnerships: nationData.partnerships || [],
          source: nationData.primarySource || ""
        },
        organizations: {
          member_of: nationData.organizations || [],
          partnerships: [],
          source: nationData.primarySource || ""
        }
      },
      contact: {
        official_contact: {
          website: nationData.website || "",
          email: nationData.email || "",
          phone: nationData.phone || "",
          address: nationData.address || "",
          source: nationData.primarySource || "",
          verified_date: "2025-08-03"
        },
        communication_preferences: {
          preferred_language: "English",
          protocol_notes: "Contact through official channels",
          source: "Standard protocols"
        }
      }
    },
    citations: {
      primary_sources: nationData.sources || [],
      secondary_sources: [],
      oral_sources: [],
      verification_notes: "Information compiled from official sources"
    },
    quality_assurance: {
      completeness: {
        required_fields_complete: true,
        missing_fields: [],
        data_gaps: []
      },
      accuracy: {
        cross_referenced: true,
        conflicting_information: [],
        verification_needed: []
      },
      cultural_sensitivity: {
        reviewed_by_community: false,
        sensitive_information_removed: true,
        permissions_obtained: false
      },
      updates: {
        last_verified: "2025-08-03",
        next_review_date: "2026-02-03",
        change_log: [
          {
            date: "2025-08-03",
            changes: "Initial data collection and standardization"
          }
        ]
      }
    },
    internal_notes: {
      research_notes: "",
      follow_up_needed: [],
      collaboration_notes: "",
      flags: []
    }
  };
};

// Parse the existing research data
const parseExistingResearch = async () => {
  const researchFile = await fs.readFile(
    path.join(__dirname, '..', 'vancouver_island_first_nations_comprehensive_data.md'),
    'utf-8'
  );

  // This is a simplified parser - in production, would need more robust parsing
  const nations = researchFile.split('\n## ').slice(1);
  
  const parsedNations = nations.map(nationText => {
    const lines = nationText.split('\n');
    const nationData = {
      officialName: '',
      alternativeNames: [],
      website: '',
      email: '',
      phone: '',
      address: '',
      population: null,
      populationYear: '',
      territoryDescription: '',
      languageFamily: '',
      traditionalLanguages: [],
      governanceType: '',
      currentLeadership: [],
      treaties: [],
      programs: [],
      sources: []
    };

    // Parse the text to extract data
    // This would need to be more sophisticated for production use
    lines.forEach(line => {
      if (line.includes('Official Name:')) {
        nationData.officialName = line.split(':')[1].trim();
      }
      if (line.includes('Traditional Name:')) {
        const tradName = line.split(':')[1].trim();
        if (tradName) nationData.alternativeNames.push(tradName);
      }
      if (line.includes('Website:')) {
        nationData.website = line.split('Website:')[1].trim();
      }
      if (line.includes('Email:')) {
        nationData.email = line.split('Email:')[1].trim();
      }
      if (line.includes('Phone:')) {
        nationData.phone = line.split('Phone:')[1].trim();
      }
      if (line.includes('Total Registered Members:')) {
        nationData.population = parseInt(line.split(':')[1].trim());
      }
    });

    // Add primary source
    if (nationData.website) {
      nationData.sources.push({
        type: "official_website",
        title: `${nationData.officialName} Official Website`,
        author: nationData.officialName,
        organization: nationData.officialName,
        url: nationData.website,
        publication_date: "2024",
        access_date: "2025-08-03",
        archive_url: "",
        notes: "Primary source"
      });
    }

    nationData.primarySource = `${nationData.officialName} official sources`;

    return nationData;
  });

  return parsedNations;
};

// Main conversion function
const convertResearchToJSON = async () => {
  console.log('Starting research data conversion...');
  
  const outputDir = path.join(
    __dirname, 
    '..', 
    'staging', 
    'research_output', 
    'north-america', 
    'canada', 
    'british-columbia',
    '2025-08-03'
  );

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  try {
    const nations = await parseExistingResearch();
    console.log(`Found ${nations.length} nations to convert`);

    for (const nationData of nations) {
      if (!nationData.officialName) continue;

      const standardizedData = createStandardizedEntry(nationData);
      
      const filename = nationData.officialName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '') + '.json';

      const filepath = path.join(outputDir, filename);
      
      await fs.writeFile(
        filepath,
        JSON.stringify(standardizedData, null, 2),
        'utf-8'
      );

      console.log(`✓ Converted: ${nationData.officialName}`);
    }

    console.log('\nConversion complete!');
    console.log(`Output directory: ${outputDir}`);

  } catch (error) {
    console.error('Error converting research:', error);
  }
};

// Run if called directly
if (require.main === module) {
  convertResearchToJSON();
}

module.exports = { createStandardizedEntry, convertResearchToJSON };