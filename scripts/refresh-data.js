const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Adjust paths to work with the repository structure
const dataDir = path.join(__dirname, '..', 'data');

// Sheet configurations
const sheetConfigs = {
  characters: {
    sheetName: 'website_characters',
    range: 'A1:O501',
    transform: (rows) => {
      const headers = rows[0];
      return rows.slice(1).map(row => {
        const character = {};
        headers.forEach((header, index) => {
          const value = row[index];
          
          // Defines which fields should be converted to numbers
          const numericFields = ['level', 'exp', 'gold', 'games'];
          
          // Converts numeric fields to numbers, keep others as strings
          if (numericFields.includes(header) && value) {
            character[header] = Number(value);
          } else {
            character[header] = value;
          }
        });
        return character;
      });
    }
  },
  // Add other sheet configs here
};

// get Google Sheets client
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

// fetch data from Google Sheets
async function fetchSheetData(configKey) {
  if (!sheetConfigs[configKey]) {
    throw new Error(`Sheet configuration for "${configKey}" not found`);
  }
  
  const config = sheetConfigs[configKey];
  const sheets = await getGoogleSheetsClient();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: `${config.sheetName}!${config.range}`,
  });
  
  const rows = response.data.values;
  
  if (!rows || rows.length === 0) {
    return [];
  }
  
  return config.transform(rows);
}

// Process all sheet configurations and save the data
async function processAllSheets(outputDir = dataDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Tracking results
  const results = {
    success: {},
    errors: {}
  };
  
  // Process all sheet configurations
  const configKeys = Object.keys(sheetConfigs);
  console.log(`Found ${configKeys.length} sheet configurations to process`);
  
  // Loop through each configuration
  for (const configKey of configKeys) {
    try {
      console.log(`Fetching data for "${configKey}"...`);
      const data = await fetchSheetData(configKey);
      
      // Write data to file
      const filename = `${configKey}.json`;
      fs.writeFileSync(
        path.join(outputDir, filename),
        JSON.stringify(data, null, 2)
      );
      
      console.log(`Saved ${data.length} records for "${configKey}"`);
      results.success[configKey] = data.length;
    } catch (error) {
      console.error(`Error processing "${configKey}":`, error.message);
      results.errors[configKey] = error.message;
    }
  }
  
  // Write a summary file with timestamp
  const summary = {
    timestamp: new Date().toISOString(),
    processed: results.success,
    errors: results.errors
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  // Log completion status
  const totalProcessed = Object.values(results.success).reduce((sum, count) => sum + count, 0);
  const errorCount = Object.keys(results.errors).length;
  
  if (errorCount === 0) {
    console.log(`Data refresh completed successfully. Processed ${totalProcessed} records across ${Object.keys(results.success).length} sheets.`);
  } else {
    console.log(`Data refresh completed with ${errorCount} errors. Processed ${totalProcessed} records successfully.`);
  }
  
  return results;
}

// Process a single sheet configuration and return the data
async function processSingleSheet(configKey, outputDir = null) {
  try {
    console.log(`Fetching data for "${configKey}"...`);
    const data = await fetchSheetData(configKey);
    
    // If output directory is provided, save the data to a file
    if (outputDir) {
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filename = `${configKey}.json`;
      fs.writeFileSync(
        path.join(outputDir, filename),
        JSON.stringify(data, null, 2)
      );
      
      console.log(`Saved ${data.length} records for "${configKey}" to ${outputDir}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error processing "${configKey}":`, error.message);
    throw error;
  }
}

async function main() {
  try {
    await processAllSheets();
  } catch (error) {
    console.error('Error refreshing data:', error);
    process.exit(1);
  }
}

// Only run the main function if this script is executed directly
if (require.main === module) {
  main();
}

// Export the functionality for use in other scripts
module.exports = {
  sheetConfigs,
  getGoogleSheetsClient,
  fetchSheetData,
  processAllSheets,
  processSingleSheet
};
