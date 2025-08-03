# Research Agent Integration Guide

## Overview
This guide helps research agents properly format and submit data for the Global Indigenous Peoples Database.

## Quick Start

### 1. Use the Standard Template
Always use our standard JSON template for comprehensive data:
```json
{
  "template_version": "1.0.0",
  "metadata": {
    "researcher_id": "agent_001",
    "research_date": "2025-08-03",
    "region": "north-america/canada/british-columbia"
  },
  "core_data": {
    // See template for full structure
  }
}
```

### 2. Required Fields (MUST have)
- `name` - Official name of the group
- `region` - Geographic region from our taxonomy
- `territory` - Traditional territory description
- `data_sources` - Properly formatted citations
- `last_verified` - Date of research (YYYY-MM-DD)

### 3. Citation Format
```
Source: [Organization/Website Name]
URL: [full URL]
Date accessed: [YYYY-MM-DD]
```

## Data Quality Guidelines

### ✅ DO:
- Use official sources (group's own website first)
- Include multiple sources for verification
- Use proper diacritics and special characters
- Provide context for conflicting information
- Mark uncertain data with confidence levels
- Include archive.org links for important sources

### ❌ DON'T:
- Use outdated or colonial terminology
- Include private/sacred information
- Make assumptions about relationships
- Use Wikipedia as a primary source
- Submit incomplete entries
- Guess at data you don't have

## Submission Process

### Step 1: Validate Your Data
```bash
# Use our validation tool
node infrastructure/validation/validate_entry.js your_data.json
```

### Step 2: Submit to Staging
Place your JSON files in:
```
staging/research_output/[region]/[date]/
```

### Step 3: Automated Processing
Our system will:
1. Validate your submission
2. Check for duplicates
3. Verify sources
4. Create staging entry
5. Generate review task

### Step 4: Review Process
- Human reviewer checks cultural sensitivity
- Sources are verified
- Data is cross-referenced
- Approved entries move to production

## Regional Specifics

### Canada
Additional fields:
- `band_number` - Official band number
- `treaty` - Treaty relationships
- `reserves` - Reserve lands

### New Zealand
Additional fields:
- `iwi` - Primary iwi affiliation
- `hapu` - Hapū (sub-tribes)
- `rohe` - Traditional boundaries
- `pepeha` - Introduction format

### Australia
Additional fields:
- `language_group` - Language family
- `native_title` - Native title status
- `land_councils` - Associated councils

## Common Issues & Solutions

### Issue: Conflicting Information
**Solution**: Document all versions with sources
```json
{
  "population": {
    "value": 5000,
    "source": "Official website 2024",
    "notes": "Government census shows 4,500 (2021)"
  }
}
```

### Issue: No Official Website
**Solution**: Use government or organization sources
```json
{
  "website": null,
  "website_notes": "No official website found. Contact via tribal council."
}
```

### Issue: Name Variations
**Solution**: Include all variations
```json
{
  "primary_name": "Cowichan Tribes",
  "alternative_names": ["Quw'utsun", "Cowichan Indian Band"]
}
```

## Quality Scoring

Your submissions are scored on:
- **Completeness** (40%): All required fields present
- **Source Quality** (30%): Official, recent sources
- **Accuracy** (20%): Cross-referenced information
- **Format** (10%): Proper structure and citations

Aim for 85%+ quality score for fast approval.

## API Integration (Coming Soon)

```python
# Future API example
import requests

data = {
    "template_version": "1.0.0",
    "core_data": {...}
}

response = requests.post(
    "https://api.indigenous-db.org/submit",
    json=data,
    headers={"X-API-Key": "your_agent_key"}
)

print(response.json()["validation_report"])
```

## Support

- **Technical Issues**: Create issue in GitHub repo
- **Data Questions**: Check regional guides
- **Urgent**: Flag with `priority: high` in submission

## Appendix: Field Mappings

If your data uses different field names, here are common mappings:

| Your Field | Our Field | Notes |
|------------|-----------|-------|
| group_name | name | Primary identifier |
| native_name | traditional_name | In Indigenous language |
| lands | territory | Traditional territory |
| members | population | Registered members |
| website | official_website | Must be official |
| sources | data_sources | Use our format |

---

Remember: Quality over quantity. One well-researched, properly cited entry is worth more than ten incomplete ones.