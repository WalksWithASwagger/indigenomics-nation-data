# New Zealand Iwi Data Enrichment Research Plan

## Date: 2025-08-03
## Research Agent: NZ Researcher

---

## Overview

Based on the infrastructure review and import summary, 51 iwi have been imported but only 8 have complete data. This plan outlines systematic research to enrich the remaining 43 iwi entries and add ~50 more iwi to reach our target of ~100.

---

## Priority Research Areas

### 1. High Priority - Core Missing Data (Week 1)

#### A. Contact Information
**Target Fields**: official_website, contact_email, contact_phone, physical_address
**Research Strategy**:
- Search Te Kāhui Māngai (tkm.govt.nz) for each iwi
- Check iwi rūnanga/trust websites directly
- Use Google search: "[iwi name] contact details 2025"
- Verify via Te Puni Kōkiri resources

#### B. Governance Details
**Target Fields**: runanga_trust, current leadership
**Research Strategy**:
- Search for "[iwi name] rūnanga" or "[iwi name] trust board"
- Check Companies Office records
- Review annual reports if available
- Look for AGM notices in local media

#### C. Treaty Settlement Information
**Target Fields**: treaty_settlement status, settlement_date, settlement_value
**Research Strategy**:
- Te Arawhiti historical records (now via Te Puni Kōkiri)
- Search: "[iwi name] treaty settlement deed"
- Check Parliament records for settlement acts
- Review Office of Treaty Settlements archives

### 2. Medium Priority - Cultural & Infrastructure (Week 2)

#### A. Marae Information
**Target Fields**: number_of_marae, marae names and locations
**Research Strategy**:
- Te Kāhui Māngai marae directory
- Regional council cultural sites
- Iwi websites "our marae" sections
- Google Maps for marae locations

#### B. Hapū Details
**Target Fields**: major_hapu
**Research Strategy**:
- Iwi websites genealogy sections
- Academic papers on iwi structure
- Te Ara Encyclopedia entries
- Historical society records

#### C. Population Updates
**Target Fields**: registered_population with 2023 census data
**Research Strategy**:
- Stats NZ 2023 census iwi data
- Iwi annual reports
- Electoral roll statistics
- Health board enrollment data

### 3. Lower Priority - Extended Information (Week 3)

#### A. Economic Entities
**Target Fields**: economic_entities, current_initiatives
**Research Strategy**:
- Companies Office searches
- Iwi investment reports
- Business directories
- News articles about iwi businesses

#### B. Educational Institutions
**Target Fields**: educational_institutions, wānanga connections
**Research Strategy**:
- Ministry of Education databases
- Kura kaupapa directories
- Iwi education strategies
- Tertiary partnerships

#### C. Media & Communications
**Target Fields**: iwi_media (radio, publications)
**Research Strategy**:
- Iwi radio station directories
- Te Māngai Pāho funding records
- Social media presence audit
- Newsletter/publication searches

#### D. Cultural Specifics
**Target Fields**: dialect_variations, pepeha_template
**Research Strategy**:
- Te Taura Whiri resources
- University linguistics departments
- Iwi language strategies
- Cultural advisors

---

## Research Methodology

### Phase 1: Batch Research by Region (Efficiency)
Group iwi by region and research systematically:

1. **Northland Batch** (8 iwi)
   - Focus: Te Hiku iwi collective resources
   - Regional council partnerships

2. **Auckland Batch** (6+ iwi)
   - Focus: Auckland Council iwi liaison
   - Urban Māori authorities

3. **Waikato Batch** (3 iwi)
   - Focus: Waikato-Tainui confederation
   - River settlement connections

4. **Bay of Plenty Batch** (10 iwi)
   - Focus: Te Arawa confederation
   - Eastern Bay collective

5. **East Coast Batch** (5 iwi)
   - Focus: Ngāti Porou connections
   - C Company relationships

6. **Taranaki Batch** (8 iwi)
   - Focus: Taranaki Iwi collective
   - Mount Taranaki co-governance

7. **Wellington/Wairarapa Batch** (4+ iwi)
   - Focus: Port Nicholson Block
   - Greater Wellington partnerships

8. **South Island Batch** (Ngāi Tahu + others)
   - Focus: 18 rūnanga system
   - Te Tau Ihu iwi

### Phase 2: Missing Iwi Research
Identify and research ~50 iwi not yet in database:

1. Review comprehensive iwi lists from:
   - Māori Fisheries Act schedule
   - Electoral roll options
   - Crown Forestry Rental Trust
   - Māori Land Court records

2. Focus on:
   - Smaller hapū recognized as iwi
   - Urban Māori authorities
   - Chatham Islands groups
   - Recent recognitions

### Phase 3: Data Validation & Quality
1. Cross-reference all data points
2. Ensure citation for every field
3. Update "last_verified" dates
4. Flag conflicting information

---

## Research Tools & Resources

### Primary Sources
1. **Te Kāhui Māngai** (tkm.govt.nz) - Official directory
2. **Te Puni Kōkiri** - Now handles Treaty info
3. **Stats NZ** - Census and demographic data
4. **Iwi Websites** - Direct authoritative source

### Secondary Sources
1. **Te Ara Encyclopedia** - Historical context
2. **Papers Past** - Historical documents
3. **Academic Databases** - Research papers
4. **News Archives** - Recent developments

### Verification Tools
1. **Companies Office** - Legal entities
2. **Charities Register** - Trust status
3. **LINZ** - Land records
4. **Courts Database** - Legal proceedings

---

## Output Format

For each iwi, create structured data following the research_intake_template.json format with:

1. **Required Fields** (must have):
   - Primary name with source
   - Region (from defined list)
   - Rohe description
   - Basic contact (at minimum website)
   - Status field
   - Last verified date
   - Data sources

2. **Priority Fields** (should have):
   - Alternative names
   - Whakapapa (ancestor)
   - Major hapū
   - Marae count
   - Population (2023)
   - Rūnanga/trust name
   - Treaty settlement status

3. **Extended Fields** (nice to have):
   - Settlement details
   - Economic entities
   - Educational institutions
   - Media outlets
   - Dialect info
   - Pepeha template

---

## Timeline & Milestones

### Week 1 (by Aug 10)
- Complete contact info for 43 existing iwi
- Add governance details
- Update Treaty settlement status

### Week 2 (by Aug 17)
- Add marae counts for all iwi
- Document major hapū
- Update 2023 population data

### Week 3 (by Aug 24)
- Research and add 25 new iwi
- Add economic entities
- Document educational connections

### Week 4 (by Aug 31)
- Research remaining 25 iwi
- Add media outlets
- Complete cultural specifics
- Final validation pass

---

## Quality Metrics

- **Completeness**: 80% of fields filled for each iwi
- **Accuracy**: 100% citation rate
- **Currency**: All data from 2023 or later where possible
- **Coverage**: 100+ iwi documented

---

## Next Immediate Steps

1. Set up systematic search queries for each batch
2. Create tracking spreadsheet for progress
3. Begin with Northland batch (strongest data availability)
4. Use parallel searches to maximize efficiency

---

*Plan Created: 2025-08-03*
*Target Completion: 2025-08-31*