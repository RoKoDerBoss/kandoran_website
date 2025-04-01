// test-sheet-fetch.js
const path = require('path');
const fs = require('fs');

// Import functions from the production script
const { 
  sheetConfigs,
  fetchSheetData, 
  processAllSheets,
  processSingleSheet
} = require('./refresh-data');

// Create a test directory in scripts folder for output
const testDir = path.join(__dirname, 'test-output');

// Function to display data sample for inspection
function displayDataSample(data, configKey) {
  console.log(`\n=== Sample data for "${configKey}" ===`);
  
  if (!data || data.length === 0) {
    console.log('No data available');
    return;
  }
  
  // Show count of records
  console.log(`Total records: ${data.length}`);
  
  // Show available fields from first record
  console.log('\nAvailable fields:');
  console.log(Object.keys(data[0]).join(', '));
  
  // Display first record as pretty JSON
  console.log('\nSample record (first item):');
  console.log(JSON.stringify(data[0], null, 2));
  
  // Show some summary statistics if numeric fields exist
  const numericFields = ['level', 'exp', 'gold', 'games'];
  const availableNumericFields = numericFields.filter(field => 
    data[0] && field in data[0] && typeof data[0][field] === 'number'
  );
  
  if (availableNumericFields.length > 0) {
    console.log('\nNumeric field statistics:');
    
    availableNumericFields.forEach(field => {
      const values = data.map(item => item[field]).filter(val => val !== undefined && val !== null);
      if (values.length > 0) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const sum = values.reduce((acc, val) => acc + val, 0);
        const avg = sum / values.length;
        
        console.log(`${field}: min=${min}, max=${max}, avg=${avg.toFixed(2)}`);
      }
    });
  }
  
  console.log('===============================\n');
}

// Main test function
async function runTests() {
  try {
    // Get the config key from command line argument, if provided
    const configToTest = process.argv[2];
    
    if (configToTest === 'all') {
      // Test all configurations and save to test directory
      console.log(`Testing ALL configurations and saving to ${testDir}`);
      const results = await processAllSheets(testDir);
      
      // Display samples of each successful configuration
      for (const configKey of Object.keys(results.success)) {
        const data = JSON.parse(
          fs.readFileSync(path.join(testDir, `${configKey}.json`), 'utf8')
        );
        displayDataSample(data, configKey);
      }
      
    } else if (configToTest && sheetConfigs[configToTest]) {
      // Test just the specified configuration
      console.log(`Testing only the "${configToTest}" configuration`);
      const data = await processSingleSheet(configToTest, testDir);
      displayDataSample(data, configToTest);
      
    } else if (configToTest) {
      // Unknown configuration
      console.error(`Error: Configuration "${configToTest}" not found`);
      console.log('Available configurations:');
      console.log(Object.keys(sheetConfigs).join(', '));
      
    } else {
      // No argument provided, show help
      console.log('Usage: node test-sheet-fetch.js [config-name|all]');
      console.log('\nAvailable configurations:');
      console.log(Object.keys(sheetConfigs).join(', '));
      console.log('\nExamples:');
      console.log('  node test-sheet-fetch.js characters  # Test only characters config');
      console.log('  node test-sheet-fetch.js all         # Test all configurations');
    }
    
  } catch (error) {
    console.error('Fatal error during test:', error);
  }
}

// Run the tests
runTests();