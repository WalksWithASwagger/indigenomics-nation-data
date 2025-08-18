# Indigenomics Nation Data

AI Driven Research for Indigenomics Institute

## Overview

A comprehensive database system documenting Indigenous peoples worldwide, starting with Vancouver Island First Nations and New Zealand Māori iwi. This project creates structured, respectful documentation of Indigenous nations while adhering to data sovereignty principles and using only publicly available information.

## Current Status

### Databases Created
- **Vancouver Island First Nations**: 40 nations documented
- **New Zealand Māori Iwi**: 51 iwi documented
- **Total Entries**: 91 Indigenous groups
- **Infrastructure**: Scalable system ready for global expansion

## Project Objectives

1. Create comprehensive databases of Indigenous peoples globally
2. Maintain verified information from official sources only
3. Respect Indigenous data sovereignty principles
4. Provide educational resources with proper attribution
5. Build scalable infrastructure for continuous expansion

## Ethical Considerations

### Indigenous Data Sovereignty

This project recognizes that Indigenous peoples have the right to govern the collection, ownership, and application of data about their communities, territories, languages, and cultures.

### Research Principles

1. **Respect**: All information is collected from publicly available sources with respect for Indigenous protocols
2. **Reciprocity**: This project aims to benefit Indigenous communities through accurate representation
3. **Responsibility**: We commit to maintaining accurate, up-to-date information
4. **Relevance**: Focus on information that Indigenous communities themselves have made public

### Guidelines

- Only use information from official First Nations websites and verified public sources
- Respect any restrictions on sharing cultural knowledge
- Acknowledge traditional territories in all documentation
- Update information regularly to ensure accuracy
- Be mindful of historical and ongoing colonialism impacts

## Regions Covered

### Vancouver Island, Canada
Three main Indigenous cultural groups:
- **Coast Salish** - Southern Vancouver Island
- **Nuu-chah-nulth** - West Coast of Vancouver Island  
- **Kwakwaka'wakw** - North Vancouver Island

### New Zealand
Comprehensive coverage of Māori iwi across:
- North Island regions
- South Island regions
- Complete with rohe (territorial boundaries) and whakapapa connections

## Infrastructure Components

### 1. Data Validation System
- Automated quality checks
- Required field validation
- Citation format verification
- Cultural sensitivity screening
- Quality scoring (0-100)

### 2. Research-to-Database Workflow
6-Stage Pipeline:
1. **Intake** - Parse multiple research formats
2. **Validation** - Automatic quality checks
3. **Staging** - Temporary storage for review
4. **Review** - Human verification
5. **Production** - Final database entry
6. **Monitoring** - Ongoing source verification

### 3. Source Monitoring
- Automated URL health checks
- Dead link detection
- Archive.org integration
- Content change detection
- Scheduled monitoring

### 4. Database Fields
Core fields maintained across all regions:
- Official and traditional names
- Territory/boundaries
- Population data
- Governance structure
- Language information
- Official websites
- Contact information
- Cultural highlights
- Current initiatives
- Treaties/agreements
- Verified sources
- Last updated dates

## Data Collection Methodology

1. **Primary Sources**: Official First Nations websites and communications
2. **Government Sources**: Federal and provincial databases
3. **Academic Sources**: Peer-reviewed research with Indigenous collaboration
4. **Community Sources**: Information shared by Nations themselves

## Project Structure

```
indigenomics-nation-data/
├── README.md
├── PROJECT_DOCUMENTATION.md
├── infrastructure/           # Core systems
│   ├── workflows/           # Automated pipelines
│   ├── validation/          # Data quality tools
│   ├── monitoring/          # Source tracking
│   ├── config/              # Master configuration
│   └── templates/           # Research templates
├── research/                # Research data
│   ├── initial_nations_list.md
│   ├── initial_iwi_list.md
│   └── comprehensive data files
├── scripts/                 # Automation scripts
│   ├── Database creation scripts
│   ├── Data import scripts
│   └── Conversion utilities
├── docs/                    # Documentation
│   ├── methodology.md
│   ├── databases_summary.md
│   └── setup guides
├── data/                    # Data storage
├── templates/               # Data schemas
└── indigenous-peoples-ui/   # React UI (in development)
```

## Contributing Guidelines

### Before Contributing

1. Read and understand the ethical considerations
2. Familiarize yourself with Indigenous data sovereignty principles
3. Use only publicly available, verified sources
4. Maintain respectful language and accurate representation

### How to Contribute

1. Use the provided templates for consistency
2. Cite all sources properly
3. Verify information from multiple sources when possible
4. Submit updates through pull requests with clear documentation

## Technical Stack

- **Database**: Notion API
- **Backend**: Node.js
- **Frontend**: React + Vite (in development)
- **Validation**: Custom JavaScript validators
- **Monitoring**: Automated source checking
- **Data Format**: JSON with standardized schemas

## Acknowledgments

We acknowledge the traditional territories of all Indigenous peoples documented in this project. This work is conducted with respect for Indigenous data sovereignty and the peoples who have been stewards of their lands since time immemorial.

## Resources

### Key Organizations
- First Nations Summit (BC)
- BC Assembly of First Nations
- Union of BC Indian Chiefs
- First Nations Health Authority

### Educational Resources
- Indigenous Foundations (UBC)
- Native Land Digital
- First Nations in BC Knowledge Network

### Government Resources
- Indigenous Services Canada
- Province of BC - Indigenous Relations

## License and Usage

This project compiles publicly available information with attribution. Users must:
- Respect Indigenous data sovereignty
- Cite original sources
- Not use information for commercial purposes without permission
- Follow all protocols established by individual First Nations

## Contact

For questions or concerns about this project, please create an issue in this repository.

---

*This project is a work in progress and welcomes respectful contributions that align with its ethical principles.*
