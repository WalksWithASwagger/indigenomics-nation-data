const { Client } = require('@notionhq/client');

class DataValidator {
  constructor() {
    this.requiredFields = {
      universal: ['name', 'region', 'territory', 'data_sources', 'last_verified'],
      citations: ['source_name', 'url', 'date_accessed']
    };
    
    this.validationRules = {
      url: /^https?:\/\/.+/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      date: /^\d{4}-\d{2}-\d{2}$/,
      phone: /^[\d\s\-\+\(\)]+$/
    };
  }

  // Main validation function
  async validateEntry(data, region) {
    const report = {
      valid: true,
      errors: [],
      warnings: [],
      score: 100,
      timestamp: new Date().toISOString()
    };

    // Check required fields
    this.checkRequiredFields(data, report);
    
    // Validate data types
    this.validateDataTypes(data, report);
    
    // Check citations
    this.validateCitations(data, report);
    
    // Check for duplicates
    await this.checkDuplicates(data, report);
    
    // Cultural sensitivity check
    this.culturalCheck(data, report);
    
    // Calculate quality score
    report.score = this.calculateScore(report);
    report.valid = report.errors.length === 0;
    
    return report;
  }

  checkRequiredFields(data, report) {
    for (const field of this.requiredFields.universal) {
      if (!data[field] || data[field].trim() === '') {
        report.errors.push(`Missing required field: ${field}`);
      }
    }
  }

  validateDataTypes(data, report) {
    // URL validation
    if (data.official_website && !this.validationRules.url.test(data.official_website)) {
      report.errors.push('Invalid URL format for official_website');
    }
    
    // Email validation
    if (data.contact_email && !this.validationRules.email.test(data.contact_email)) {
      report.errors.push('Invalid email format');
    }
    
    // Date validation
    if (data.last_verified && !this.validationRules.date.test(data.last_verified)) {
      report.errors.push('Invalid date format (use YYYY-MM-DD)');
    }
    
    // Population should be a number
    if (data.population && isNaN(parseInt(data.population))) {
      report.errors.push('Population must be a number');
    }
  }

  validateCitations(data, report) {
    if (!data.data_sources) {
      report.errors.push('No data sources provided');
      return;
    }

    const sources = this.parseSources(data.data_sources);
    
    if (sources.length === 0) {
      report.errors.push('Data sources not properly formatted');
    }
    
    sources.forEach((source, index) => {
      // Check for required citation fields
      if (!source.source_name) {
        report.errors.push(`Citation ${index + 1}: Missing source name`);
      }
      
      if (!source.date_accessed) {
        report.warnings.push(`Citation ${index + 1}: Missing access date`);
      }
      
      // Validate URLs in citations
      if (source.url && !this.validationRules.url.test(source.url)) {
        report.errors.push(`Citation ${index + 1}: Invalid URL`);
      }
    });
  }

  parseSources(sourcesText) {
    // Parse the standard citation format
    const sources = [];
    const sourceBlocks = sourcesText.split(/Source:/gi).filter(s => s.trim());
    
    sourceBlocks.forEach(block => {
      const source = {};
      
      // Extract source name (first line)
      const lines = block.trim().split('\n');
      source.source_name = lines[0].trim();
      
      // Extract URL
      const urlMatch = block.match(/URL:\s*(.+)/i);
      if (urlMatch) source.url = urlMatch[1].trim();
      
      // Extract date
      const dateMatch = block.match(/Date accessed:\s*(.+)/i);
      if (dateMatch) source.date_accessed = dateMatch[1].trim();
      
      sources.push(source);
    });
    
    return sources;
  }

  async checkDuplicates(data, report) {
    // This would connect to your database to check for duplicates
    // For now, we'll add a warning to implement this
    if (!data._duplicate_checked) {
      report.warnings.push('Duplicate check not performed - implement database connection');
    }
  }

  culturalCheck(data, report) {
    // Check for potentially sensitive content
    const sensitiveTerms = ['extinct', 'primitive', 'savage', 'discovered'];
    const contentToCheck = JSON.stringify(data).toLowerCase();
    
    sensitiveTerms.forEach(term => {
      if (contentToCheck.includes(term)) {
        report.warnings.push(`Potentially insensitive term found: "${term}" - please review`);
      }
    });
    
    // Check proper name formatting (basic check for now)
    if (data.name && data.name === data.name.toUpperCase()) {
      report.warnings.push('Name is all uppercase - check proper formatting');
    }
  }

  calculateScore(report) {
    let score = 100;
    
    // Deduct points for errors and warnings
    score -= report.errors.length * 10;
    score -= report.warnings.length * 5;
    
    return Math.max(0, score);
  }

  // Batch validation
  async validateBatch(entries, region) {
    const results = {
      total: entries.length,
      valid: 0,
      invalid: 0,
      reports: []
    };
    
    for (const entry of entries) {
      const report = await this.validateEntry(entry, region);
      results.reports.push({
        name: entry.name,
        report
      });
      
      if (report.valid) {
        results.valid++;
      } else {
        results.invalid++;
      }
    }
    
    return results;
  }

  // Generate validation report
  generateReport(results) {
    const report = {
      summary: {
        total: results.total,
        valid: results.valid,
        invalid: results.invalid,
        success_rate: ((results.valid / results.total) * 100).toFixed(2) + '%'
      },
      issues: {
        errors: [],
        warnings: []
      },
      recommendations: []
    };
    
    // Aggregate all issues
    results.reports.forEach(r => {
      if (r.report.errors.length > 0) {
        report.issues.errors.push({
          entry: r.name,
          errors: r.report.errors
        });
      }
      if (r.report.warnings.length > 0) {
        report.issues.warnings.push({
          entry: r.name,
          warnings: r.report.warnings
        });
      }
    });
    
    // Add recommendations
    if (report.issues.errors.length > 0) {
      report.recommendations.push('Fix all validation errors before importing to production');
    }
    if (report.issues.warnings.length > 0) {
      report.recommendations.push('Review all warnings and update entries as needed');
    }
    
    return report;
  }
}

module.exports = DataValidator;