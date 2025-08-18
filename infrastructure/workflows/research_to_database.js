const { Client } = require('@notionhq/client');
const DataValidator = require('../validation/data_validator');
const fs = require('fs').promises;
const path = require('path');

class ResearchToDatabaseWorkflow {
  constructor(notionApiKey, stagingDbId, productionDbId) {
    this.notion = new Client({ auth: notionApiKey });
    this.validator = new DataValidator();
    this.stagingDbId = stagingDbId;
    this.productionDbId = productionDbId;
    
    this.workflowStages = [
      'intake',
      'validation',
      'staging',
      'review',
      'production',
      'monitoring'
    ];
  }

  // Main workflow orchestrator
  async processResearchBatch(researchFiles, region) {
    const workflow = {
      id: this.generateWorkflowId(),
      startTime: new Date(),
      region: region,
      status: 'in_progress',
      stages: {},
      results: {
        total: researchFiles.length,
        successful: 0,
        failed: 0,
        warnings: 0
      }
    };

    console.log(`Starting workflow ${workflow.id} for ${researchFiles.length} files`);

    // Stage 1: Intake
    workflow.stages.intake = await this.intakeStage(researchFiles);
    
    // Stage 2: Validation
    workflow.stages.validation = await this.validationStage(workflow.stages.intake.data);
    
    // Stage 3: Staging
    workflow.stages.staging = await this.stagingStage(
      workflow.stages.validation.validEntries,
      region
    );
    
    // Stage 4: Review (creates review tasks)
    workflow.stages.review = await this.reviewStage(workflow.stages.staging.entries);
    
    // Stage 5: Production (after manual review)
    // This would be triggered separately after review
    
    workflow.endTime = new Date();
    workflow.duration = workflow.endTime - workflow.startTime;
    workflow.status = 'completed';
    
    // Save workflow report
    await this.saveWorkflowReport(workflow);
    
    return workflow;
  }

  // Stage 1: Intake - Parse research files
  async intakeStage(files) {
    const stage = {
      status: 'processing',
      startTime: new Date(),
      data: [],
      errors: []
    };

    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const parsed = JSON.parse(content);
        
        // Transform to standard format
        const standardized = this.standardizeData(parsed);
        stage.data.push({
          sourceFile: file,
          data: standardized,
          originalFormat: this.detectFormat(parsed)
        });
      } catch (error) {
        stage.errors.push({
          file: file,
          error: error.message
        });
      }
    }

    stage.status = 'completed';
    stage.endTime = new Date();
    return stage;
  }

  // Stage 2: Validation
  async validationStage(intakeData) {
    const stage = {
      status: 'processing',
      startTime: new Date(),
      validEntries: [],
      invalidEntries: [],
      reports: []
    };

    for (const item of intakeData) {
      const validationReport = await this.validator.validateEntry(item.data);
      
      if (validationReport.valid) {
        stage.validEntries.push({
          ...item,
          validationReport
        });
      } else {
        stage.invalidEntries.push({
          ...item,
          validationReport
        });
      }
      
      stage.reports.push(validationReport);
    }

    stage.summary = {
      total: intakeData.length,
      valid: stage.validEntries.length,
      invalid: stage.invalidEntries.length,
      averageScore: stage.reports.reduce((sum, r) => sum + r.score, 0) / stage.reports.length
    };

    stage.status = 'completed';
    stage.endTime = new Date();
    return stage;
  }

  // Stage 3: Staging - Add to staging database
  async stagingStage(validEntries, region) {
    const stage = {
      status: 'processing',
      startTime: new Date(),
      entries: [],
      errors: []
    };

    for (const entry of validEntries) {
      try {
        const notionPage = await this.createStagingEntry(entry.data, region);
        stage.entries.push({
          data: entry.data,
          stagingId: notionPage.id,
          url: notionPage.url
        });
      } catch (error) {
        stage.errors.push({
          entry: entry.data.name,
          error: error.message
        });
      }
    }

    stage.summary = {
      total: validEntries.length,
      staged: stage.entries.length,
      failed: stage.errors.length
    };

    stage.status = 'completed';
    stage.endTime = new Date();
    return stage;
  }

  // Stage 4: Review - Create review tasks
  async reviewStage(stagedEntries) {
    const stage = {
      status: 'processing',
      startTime: new Date(),
      reviewTasks: []
    };

    for (const entry of stagedEntries) {
      const reviewTask = {
        entryName: entry.data.name,
        stagingId: entry.stagingId,
        stagingUrl: entry.url,
        reviewChecklist: [
          'Verify primary sources',
          'Check cultural sensitivity',
          'Confirm name spelling and diacritics',
          'Validate contact information',
          'Cross-reference with existing entries',
          'Check for recent updates'
        ],
        assignedTo: null,
        status: 'pending',
        createdAt: new Date()
      };
      
      stage.reviewTasks.push(reviewTask);
    }

    // Save review tasks to a review queue
    await this.saveReviewTasks(stage.reviewTasks);

    stage.status = 'completed';
    stage.endTime = new Date();
    return stage;
  }

  // Create staging database entry
  async createStagingEntry(data, region) {
    const properties = this.transformToNotionProperties(data, region);
    
    // Add staging metadata
    properties['Staging Status'] = { select: { name: 'Pending Review' } };
    properties['Import Date'] = { date: { start: new Date().toISOString().split('T')[0] } };
    properties['Region'] = { select: { name: region } };
    
    const response = await this.notion.pages.create({
      parent: { database_id: this.stagingDbId },
      properties: properties
    });
    
    return response;
  }

  // Transform data to Notion property format
  transformToNotionProperties(data, region) {
    // This is a simplified version - expand based on your schema
    const properties = {
      'Name': { title: [{ text: { content: data.name || '' } }] },
      'Traditional Name': { rich_text: [{ text: { content: data.traditional_name || '' } }] },
      'Territory': { rich_text: [{ text: { content: data.territory || '' } }] },
      'Population': data.population ? { number: parseInt(data.population) } : { number: null },
      'Official Website': data.website ? { url: data.website } : { url: null },
      'Data Sources': { rich_text: [{ text: { content: data.data_sources || '' } }] },
      'Last Verified': { date: { start: data.last_verified || new Date().toISOString().split('T')[0] } },
      'Status': { select: { name: 'In Progress' } }
    };
    
    return properties;
  }

  // Standardize various input formats
  standardizeData(rawData) {
    // Handle different research agent formats
    if (rawData.core_data) {
      // Handle the comprehensive template format
      return {
        name: rawData.core_data.identification.primary_name.value,
        traditional_name: rawData.core_data.identification.alternative_names.value.join(', '),
        territory: rawData.core_data.location.traditional_territory.description,
        population: rawData.core_data.demographics.population.total,
        website: rawData.core_data.contact.official_contact.website,
        data_sources: this.formatCitations(rawData.citations),
        last_verified: new Date().toISOString().split('T')[0]
      };
    } else {
      // Handle simpler formats
      return {
        name: rawData.name || rawData.group_name || rawData.title,
        traditional_name: rawData.traditional_name || rawData.indigenous_name || '',
        territory: rawData.territory || rawData.location || '',
        population: rawData.population || null,
        website: rawData.website || rawData.official_website || '',
        data_sources: rawData.sources || rawData.data_sources || '',
        last_verified: rawData.date || new Date().toISOString().split('T')[0]
      };
    }
  }

  // Format citations properly
  formatCitations(citations) {
    if (!citations || !citations.primary_sources) return '';
    
    return citations.primary_sources.map(source => 
      `Source: ${source.title}\nURL: ${source.url}\nDate accessed: ${source.access_date}`
    ).join('\n\n');
  }

  // Detect input format
  detectFormat(data) {
    if (data.core_data) return 'comprehensive_template';
    if (data.group_name) return 'simple_format';
    return 'unknown';
  }

  // Save workflow report
  async saveWorkflowReport(workflow) {
    const reportPath = path.join(
      __dirname,
      '../reports',
      `workflow_${workflow.id}.json`
    );
    
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(workflow, null, 2));
    
    console.log(`Workflow report saved: ${reportPath}`);
  }

  // Save review tasks
  async saveReviewTasks(tasks) {
    const tasksPath = path.join(
      __dirname,
      '../review_queue',
      `review_tasks_${Date.now()}.json`
    );
    
    await fs.mkdir(path.dirname(tasksPath), { recursive: true });
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  }

  // Generate unique workflow ID
  generateWorkflowId() {
    return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Approve and move to production
  async approveForProduction(stagingId) {
    // Get entry from staging
    const stagingEntry = await this.notion.pages.retrieve({ page_id: stagingId });
    
    // Transform properties for production
    const productionProperties = { ...stagingEntry.properties };
    delete productionProperties['Staging Status'];
    productionProperties['Status'] = { select: { name: 'Complete' } };
    
    // Create in production
    const productionEntry = await this.notion.pages.create({
      parent: { database_id: this.productionDbId },
      properties: productionProperties
    });
    
    // Archive staging entry
    await this.notion.pages.update({
      page_id: stagingId,
      properties: {
        'Staging Status': { select: { name: 'Migrated to Production' } }
      },
      archived: true
    });
    
    return productionEntry;
  }
}

module.exports = ResearchToDatabaseWorkflow;