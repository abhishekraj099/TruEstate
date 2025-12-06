import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../../data/sales_data.csv');
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        salesData.push(row);
      })
      .on('end', () => {
        console.log(`✅ Loaded ${salesData.length} records from CSV`);
        resolve(salesData);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export const getSalesData = () => salesData;
