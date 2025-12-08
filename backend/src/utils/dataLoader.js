import fs from 'fs';
import csv from 'csv-parser';
import Sales from '../models/Sales.js';
import connectDB from '../config/db.config.js';

const BATCH_SIZE = 1000;

export const loadCSVToDatabase = async (csvFilePath) => {
  try {
    // Connect to database (Atlas via MONGODB_URI)
    await connectDB();

    // Check if file exists
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`❌ CSV file not found at: ${csvFilePath}`);
    }

    // Clear existing data if any
    const existingCount = await Sales.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️ Found ${existingCount} existing records.`);
      console.log('🗑️  Clearing old data...');
      await Sales.deleteMany({});
      console.log('✅ Old data cleared.\n');
    }

    let batch = [];
    let totalImported = 0;
    let errorCount = 0;

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          try {
            // Safe date parsing
            let date = null;
            if (row['Date']) {
              const d = new Date(row['Date']);
              if (!isNaN(d.getTime())) {
                date = d;
              }
            }

            batch.push({
              customerId: row['Customer ID'],
              customerName: row['Customer Name'],
              phoneNumber: row['Phone Number'],
              gender: row['Gender'],
              age: parseInt(row['Age']) || 0,
              customerRegion: row['Customer Region'],
              customerType: row['Customer Type'],
              productId: row['Product ID'],
              productName: row['Product Name'],
              brand: row['Brand'],
              productCategory: row['Product Category'],
              tags: row['Tags'],
              quantity: parseInt(row['Quantity']) || 0,
              pricePerUnit: parseFloat(row['Price per Unit']) || 0,
              discountPercentage: parseFloat(row['Discount Percentage']) || 0,
              totalAmount: parseFloat(row['Total Amount']) || 0,
              finalAmount: parseFloat(row['Final Amount']) || 0,
              date,
              paymentMethod: row['Payment Method'],
              orderStatus: row['Order Status'],
              deliveryType: row['Delivery Type'],
              storeId: row['Store ID'],
              storeLocation: row['Store Location'],
              salespersonId: row['Salesperson ID'],
              employeeName: row['Employee Name'],
            });

            // Insert in batches
            if (batch.length >= BATCH_SIZE) {
              try {
                await Sales.insertMany(batch);
                totalImported += batch.length;
                console.log(`✅ Imported ${totalImported} records...`);
                batch = [];
              } catch (err) {
                console.error('❌ Batch insert error:', err.message);
                errorCount++;
                batch = [];
              }
            }
          } catch {
            errorCount++;
          }
        })
        .on('end', async () => {
          try {
            // Insert remaining records
            if (batch.length > 0) {
              await Sales.insertMany(batch);
              totalImported += batch.length;
            }

            if (errorCount > 0) {
              console.log(`⚠️ Errors encountered: ${errorCount}`);
            }

            resolve(totalImported);
          } catch (err) {
            reject(err);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};
