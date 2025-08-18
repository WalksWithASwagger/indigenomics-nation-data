const axios = require('axios');
const { Client } = require('@notionhq/client');

class SourceMonitor {
  constructor(notionApiKey) {
    this.notion = new Client({ auth: notionApiKey });
    this.checkInterval = 24 * 60 * 60 * 1000; // 24 hours
    this.archiveOrgApi = 'https://archive.org/wayback/available?url=';
  }

  // Monitor all sources in a database
  async monitorDatabase(databaseId) {
    const report = {
      databaseId: databaseId,
      checkDate: new Date(),
      totalEntries: 0,
      totalSources: 0,
      results: {
        active: [],
        dead: [],
        changed: [],
        archived: []
      },
      summary: {}
    };

    // Get all entries from database
    const entries = await this.getAllEntries(databaseId);
    report.totalEntries = entries.length;

    // Check each entry's sources
    for (const entry of entries) {
      const sources = this.extractSources(entry);
      report.totalSources += sources.length;

      for (const source of sources) {
        const checkResult = await this.checkSource(source);
        
        // Categorize results
        if (checkResult.status === 'active') {
          report.results.active.push(checkResult);
        } else if (checkResult.status === 'dead') {
          report.results.dead.push(checkResult);
          
          // Try to find archived version
          const archived = await this.checkArchiveOrg(source.url);
          if (archived) {
            checkResult.archiveUrl = archived;
            report.results.archived.push(checkResult);
          }
        } else if (checkResult.status === 'changed') {
          report.results.changed.push(checkResult);
        }

        // Update entry if needed
        if (checkResult.status !== 'active') {
          await this.flagEntry(entry.id, checkResult);
        }
      }
    }

    // Generate summary
    report.summary = {
      totalActive: report.results.active.length,
      totalDead: report.results.dead.length,
      totalChanged: report.results.changed.length,
      totalArchived: report.results.archived.length,
      healthScore: (report.results.active.length / report.totalSources * 100).toFixed(2) + '%'
    };

    return report;
  }

  // Get all entries from a Notion database
  async getAllEntries(databaseId) {
    const entries = [];
    let hasMore = true;
    let startCursor;

    while (hasMore) {
      const response = await this.notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
        page_size: 100
      });

      entries.push(...response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    return entries;
  }

  // Extract sources from an entry
  extractSources(entry) {
    const sources = [];
    
    // Check Data Sources field
    if (entry.properties['Data Sources']) {
      const sourcesText = this.getTextFromProperty(entry.properties['Data Sources']);
      const extracted = this.parseSourcesFromText(sourcesText);
      sources.push(...extracted.map(s => ({
        ...s,
        entryId: entry.id,
        entryName: this.getTextFromProperty(entry.properties['Name'] || entry.properties['Nation Name'] || entry.properties['Iwi Name'])
      })));
    }

    // Check Official Website field
    if (entry.properties['Official Website']?.url) {
      sources.push({
        url: entry.properties['Official Website'].url,
        type: 'official_website',
        entryId: entry.id,
        entryName: this.getTextFromProperty(entry.properties['Name'] || entry.properties['Nation Name'] || entry.properties['Iwi Name'])
      });
    }

    return sources;
  }

  // Parse sources from text
  parseSourcesFromText(text) {
    const sources = [];
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = text.match(urlRegex) || [];

    urls.forEach(url => {
      sources.push({
        url: url,
        type: 'citation'
      });
    });

    return sources;
  }

  // Check if a source is active
  async checkSource(source) {
    const result = {
      ...source,
      checkDate: new Date(),
      status: 'unknown',
      statusCode: null,
      error: null
    };

    try {
      const response = await axios.head(source.url, {
        timeout: 10000,
        maxRedirects: 5,
        validateStatus: () => true
      });

      result.statusCode = response.status;

      if (response.status === 200) {
        result.status = 'active';
      } else if (response.status === 404) {
        result.status = 'dead';
      } else if ([301, 302, 307, 308].includes(response.status)) {
        result.status = 'redirected';
        result.newUrl = response.headers.location;
      } else {
        result.status = 'error';
      }

      // Check if content has changed significantly
      if (result.status === 'active' && source.lastChecksum) {
        const contentCheck = await this.checkContentChange(source.url, source.lastChecksum);
        if (contentCheck.changed) {
          result.status = 'changed';
          result.changeDetails = contentCheck;
        }
      }

    } catch (error) {
      result.status = 'dead';
      result.error = error.message;
    }

    return result;
  }

  // Check Archive.org for archived versions
  async checkArchiveOrg(url) {
    try {
      const response = await axios.get(this.archiveOrgApi + encodeURIComponent(url));
      
      if (response.data.archived_snapshots?.closest?.available) {
        return {
          url: response.data.archived_snapshots.closest.url,
          timestamp: response.data.archived_snapshots.closest.timestamp,
          status: response.data.archived_snapshots.closest.status
        };
      }
    } catch (error) {
      console.error('Archive.org check failed:', error.message);
    }
    
    return null;
  }

  // Check if content has changed
  async checkContentChange(url, previousChecksum) {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        maxRedirects: 5
      });

      // Simple checksum based on content length and key markers
      const currentChecksum = {
        length: response.data.length,
        title: this.extractTitle(response.data),
        lastModified: response.headers['last-modified']
      };

      const changed = 
        currentChecksum.length !== previousChecksum.length ||
        currentChecksum.title !== previousChecksum.title;

      return {
        changed,
        previous: previousChecksum,
        current: currentChecksum
      };

    } catch (error) {
      return { changed: false, error: error.message };
    }
  }

  // Extract title from HTML
  extractTitle(html) {
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : '';
  }

  // Flag an entry with source issues
  async flagEntry(entryId, issue) {
    try {
      const updates = {
        'Status': { select: { name: 'Needs Update' } }
      };

      // Add note about the issue
      const noteText = `Source issue detected on ${new Date().toISOString()}:\n` +
                      `URL: ${issue.url}\n` +
                      `Status: ${issue.status}\n` +
                      `${issue.archiveUrl ? 'Archive available: ' + issue.archiveUrl.url : ''}`;

      await this.notion.pages.update({
        page_id: entryId,
        properties: updates
      });

      // Add comment with details
      await this.notion.comments.create({
        parent: { page_id: entryId },
        rich_text: [{
          type: 'text',
          text: { content: noteText }
        }]
      });

    } catch (error) {
      console.error('Failed to flag entry:', error);
    }
  }

  // Get text from Notion property
  getTextFromProperty(property) {
    if (!property) return '';
    
    if (property.title) {
      return property.title.map(t => t.plain_text).join('');
    } else if (property.rich_text) {
      return property.rich_text.map(t => t.plain_text).join('');
    } else if (property.url) {
      return property.url;
    }
    
    return '';
  }

  // Schedule automatic monitoring
  scheduleMonitoring(databaseId, interval = this.checkInterval) {
    console.log(`Scheduling source monitoring for database ${databaseId}`);
    
    // Run immediately
    this.runMonitoring(databaseId);
    
    // Schedule recurring checks
    setInterval(() => {
      this.runMonitoring(databaseId);
    }, interval);
  }

  // Run monitoring and save report
  async runMonitoring(databaseId) {
    console.log(`Running source monitoring for database ${databaseId} at ${new Date()}`);
    
    try {
      const report = await this.monitorDatabase(databaseId);
      
      // Save report
      const fs = require('fs').promises;
      const path = require('path');
      const reportPath = path.join(
        __dirname,
        '../reports/monitoring',
        `source_monitor_${databaseId}_${Date.now()}.json`
      );
      
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      
      console.log(`Monitoring complete. Health score: ${report.summary.healthScore}`);
      
      // Alert if health score is low
      if (parseFloat(report.summary.healthScore) < 80) {
        console.warn(`⚠️  Low health score for database ${databaseId}: ${report.summary.healthScore}`);
      }
      
      return report;
      
    } catch (error) {
      console.error('Monitoring failed:', error);
    }
  }
}

module.exports = SourceMonitor;