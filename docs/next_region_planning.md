# Next Region Planning - Global Indigenous Database

## Current Status (2025-08-03)

### ✅ Completed Regions
1. **Vancouver Island, Canada**
   - 40 First Nations documented
   - 3 cultural groups (Coast Salish, Nuu-chah-nulth, Kwakwaka'wakw)
   - Database: https://www.notion.so/244c6f799a33814ca939e50e5260e8f7

2. **New Zealand/Aotearoa**
   - 51 Māori iwi documented (of ~100)
   - 15 regional classifications
   - Database: https://www.notion.so/244c6f799a3381a9a757f86ab90ec3f6

### 🏗️ Infrastructure Ready
- ✅ Automated validation system
- ✅ Research intake templates
- ✅ Source monitoring
- ✅ Batch import capabilities
- ✅ Quality scoring
- ✅ Citation tracking

## 🌍 Recommended Next Regions (Priority Order)

### 1. **Australia** - RECOMMENDED NEXT
**Why**: 
- Similar Commonwealth/colonial history to Canada/NZ
- English-language sources readily available
- Strong Indigenous data governance frameworks
- Government databases accessible

**Scope**:
- ~500-600 Aboriginal nations/language groups
- Torres Strait Islander communities
- Urban Indigenous organizations

**Key Differences**:
- Language groups vs tribal structures
- Native Title system
- Land Councils structure
- State-based variations

**Research Approach**:
1. Start with AIATSIS (Australian Institute of Aboriginal and Torres Strait Islander Studies)
2. Use Native Title determinations as framework
3. State by state approach
4. Separate Torres Strait Islander database

### 2. **Rest of Canada** 
**Why**:
- Extend existing Vancouver Island work
- Same governmental frameworks
- Existing relationships/knowledge

**Scope**:
- ~630 First Nations
- 53 Inuit communities
- 8 Métis Settlements (Alberta)
- Métis Nation governance bodies

**Structure**:
- By province/territory
- Separate databases for First Nations/Inuit/Métis
- Treaty areas as organizing principle

### 3. **United States - Pacific Northwest**
**Why**:
- Cultural continuity with Vancouver Island groups
- Many cross-border nations
- Strong tribal sovereignty

**Scope**:
- Washington State tribes (~30)
- Oregon tribes (~10)
- Northern California tribes (~20)
- Alaska Native villages (~200)

### 4. **Pacific Islands**
**Why**:
- Cultural similarities to Māori
- Manageable scope for island nations
- Colonial history similarities

**Scope**:
- Fiji - iTaukei confederacies
- Samoa - village districts
- Tonga - noble estates
- Hawaii - Native Hawaiian organizations

## 📋 Region Selection Criteria

### Prioritize regions with:
1. **Accessible Data**
   - Government databases
   - English/French/Spanish sources
   - Established Indigenous organizations

2. **Legal Recognition**
   - Formal recognition systems
   - Treaty/agreement frameworks
   - Self-governance structures

3. **Research Readiness**
   - Existing comprehensive lists
   - Public contact information
   - Active websites/social media

4. **Cultural Considerations**
   - Indigenous data sovereignty respected
   - Community protocols understood
   - Appropriate terminology established

## 🚀 Implementation Plan for Australia

### Phase 1: Research & Setup (Week 1)
1. Create Australia-specific database schema
2. Research state/territory structures
3. Identify authoritative sources:
   - AIATSIS
   - Native Title Tribunal
   - State Aboriginal Affairs departments
4. Create intake templates

### Phase 2: Initial Data Collection (Week 2-3)
1. Start with recognized Native Title groups
2. Add Land Council members
3. Include major urban organizations
4. Focus on groups with websites

### Phase 3: Enrichment (Week 4+)
1. Add language group information
2. Include Native Title details
3. Map traditional territories
4. Add cultural information

### Database Structure Adaptations for Australia
```javascript
// Additional fields needed
{
  "language_group": "select",
  "native_title_status": "select",
  "land_council": "relation",
  "prescribed_body_corporate": "text",
  "nntt_number": "text", // Native Title reference
  "state_territory": "select",
  "aiatsis_code": "text"
}
```

## 🎯 Success Metrics

### Short-term (3 months)
- 3 new regions launched
- 500+ new entries
- 90%+ data quality score
- Automated monitoring active

### Medium-term (6 months)
- 5-7 regions complete
- 1,500+ entries
- Research agent integration
- Public API beta

### Long-term (1 year)
- 15+ regions
- 3,000+ entries
- Multi-language support
- Mobile app

## 🔧 Infrastructure Improvements Needed

### Before Australia Launch
1. Create automated AIATSIS code lookup
2. Build Native Title API integration
3. Add GeoJSON boundary support
4. Implement language family taxonomy

### General Improvements
1. Automated translation for non-English sources
2. Duplicate detection across regions
3. Relationship mapping between groups
4. Historical timeline tracking

## 📚 Resources for Research Agents

### Australia Specific
- AIATSIS: https://aiatsis.gov.au/
- Native Title Tribunal: http://www.nntt.gov.au/
- First Languages Australia: https://www.firstlanguages.org.au/

### General
- IWGIA (International Work Group for Indigenous Affairs)
- Cultural Survival
- UN Permanent Forum on Indigenous Issues

---

**Recommendation**: Begin with Australia, using the same systematic approach that succeeded in New Zealand. The infrastructure is ready, the patterns are established, and the data sources are accessible.