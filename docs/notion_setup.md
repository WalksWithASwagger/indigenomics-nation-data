# Notion Database Setup Guide

## Creating the Database

1. **Create a New Database**
   - In Notion, create a new page
   - Select "Table" as the database type
   - Name it "Vancouver Island First Nations"

2. **Set Up Properties**
   - Follow the schema in `templates/data_schema.json`
   - Add each property with the correct type
   - Set required fields accordingly

## Property Configuration Details

### Basic Information
- **Nation Name** (Title) - The main identifier
- **Traditional Name** (Text) - Indigenous language name
- **Cultural Group** (Select) - Coast Salish, Nuu-chah-nulth, or Kwakwaka'wakw
- **Language Family** (Text) - Specific language and dialect

### Location Information
- **Traditional Territory** (Text) - Description of traditional lands
- **Coordinates** (Text) - GPS coordinates for mapping

### Contact Information
- **Official Website** (URL) - Link to official site
- **Contact Email** (Email) - Public email only
- **Contact Phone** (Phone) - Public phone only

### Demographics & Governance
- **Population** (Number) - If publicly available
- **Governance Type** (Multi-select) - Can have multiple types
- **Chief Councillor** (Text) - Current leadership

### Detailed Information
- **History Overview** (Text) - Brief respectful history
- **Cultural Highlights** (Text) - Public cultural information
- **Current Initiatives** (Text) - Active programs and projects

### Legal & Administrative
- **Treaties/Agreements** (Multi-select) - Legal relationships
- **Treaty Details** (Text) - Specific information
- **Resources/Links** (Text) - Additional resources

### Metadata
- **Data Sources** (Text) - Required citations
- **Last Verified** (Date) - When data was checked
- **Status** (Select) - Research progress
- **Notes** (Text) - Internal research notes

## Setting Up Views

### 1. Board View by Cultural Group
- Create new view → Board
- Group by: Cultural Group
- Sort by: Nation Name
- Useful for seeing distribution

### 2. Board View by Status
- Create new view → Board  
- Group by: Status
- Sort by: Last Verified
- Track research progress

### 3. Master Table View
- Default table view
- Show all properties
- Sort alphabetically by Nation Name

### 4. Map View (if available)
- Create new view → Map
- Location property: Coordinates
- Shows geographic distribution

## Database Templates

### New Nation Entry Template
1. Click "New" dropdown → "New template"
2. Name: "New First Nation Entry"
3. Pre-fill:
   - Status: "In Progress"
   - Last Verified: Today's date
   - Data Sources: "Source: [Date accessed: ]"

## Data Entry Best Practices

1. **Start with Official Sources**
   - Always check official First Nation website first
   - Use government databases for supplementary info

2. **Citation Format**
   ```
   Source: [Website/Document Name]
   URL: [link]
   Date accessed: [YYYY-MM-DD]
   ```

3. **Verification Process**
   - Cross-reference multiple sources
   - Update "Last Verified" date
   - Note any discrepancies in Notes field

4. **Respect Protocols**
   - Only include publicly available information
   - Respect any stated restrictions
   - When in doubt, leave it out

## Filters and Sorting

### Useful Filters
- Status = "Needs Update" (for maintenance)
- Last Verified < 6 months ago
- Official Website is empty (to find sites)
- Cultural Group = [specific group]

### Recommended Sorts
- Primary: Nation Name (A→Z)
- Secondary: Cultural Group
- For maintenance: Last Verified (oldest first)

## Sharing and Permissions

1. **Read-Only Sharing**
   - Default for public viewing
   - Protects data integrity

2. **Edit Permissions**
   - Only for verified contributors
   - Require understanding of protocols

3. **Export Options**
   - CSV for data analysis
   - Markdown for reports
   - API for integration

## Maintenance Schedule

- **Monthly**: Review "Needs Update" status items
- **Quarterly**: Verify all official websites still active
- **Annually**: Comprehensive data verification

## Integration with Research

- Link to research notes in `/research/nations/`
- Reference source documents in `/research/sources/`
- Use consistent naming: `nation_name_research.md`