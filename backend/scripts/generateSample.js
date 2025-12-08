import { loadCSVToDatabase } from '../src/utils/dataLoader.js';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, '../data/sales_data.csv');

console.log('='.repeat(60));
console.log('📊 TrueState Sales System - Data Import');
console.log('='.repeat(60));
console.log('📂 CSV File Path:', csvPath);
console.log('🔗 MongoDB URI:', process.env.MONGODB_URI ? '✅ Configured' : '❌ Missing');
console.log('='.repeat(60));
console.log('\n🔄 Starting import process...\n');

loadCSVToDatabase(csvPath)
  .then((count) => {
    console.log('\n' + '='.repeat(60));
    console.log('✅ IMPORT SUCCESSFUL!');
    console.log(`📊 Total records imported: ${count}`);
    console.log('='.repeat(60));
    console.log('\n💡 Next steps:');
    console.log('   1. Run "npm run check-db" to verify data');
    console.log('   2. Run "npm start" to start the server');
    console.log('   3. Test API: http://localhost:5000/api/sales\n');
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.log('\n' + '='.repeat(60));
    console.error('❌ IMPORT FAILED!');
    console.error('Error:', error.message);
    console.log('='.repeat(60));
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check if CSV file exists at:', csvPath);
    console.log('   2. Verify MongoDB connection in .env file');
    console.log('   3. Ensure MongoDB cluster is accessible\n');
    
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close();
    }
    process.exit(1);
  });
