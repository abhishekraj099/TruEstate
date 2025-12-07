import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];
const CSV_PATH = path.join(__dirname, '../../data/sales_data.csv');

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    console.log('📊 Loading sales data from CSV...');
    
    if (!fs.existsSync(CSV_PATH)) {
      return reject(new Error('CSV file not found. Run build script first.'));
    }
    
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => salesData.push(row))
      .on('end', () => {
        console.log(`✅ Loaded ${salesData.length} records`);
        resolve(salesData);
      })
      .on('error', reject);
  });
};

export const getSalesData = () => salesData;
