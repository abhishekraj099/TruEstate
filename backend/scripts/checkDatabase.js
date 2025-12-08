import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sales from '../src/models/Sales.js';

dotenv.config();

async function checkDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Sales.countDocuments();
    console.log(`📊 Total records in database: ${count}`);
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
}

checkDatabase();
