import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const regions = ['North', 'South', 'East', 'West', 'Central'];
const genders = ['Male', 'Female'];
const categories = ['Electronics', 'Clothing', 'Beauty', 'Sports', 'Home'];
const payments = ['Credit Card', 'Debit Card', 'Cash', 'UPI'];
const statuses = ['Completed', 'Pending', 'Cancelled'];
const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis', 'Chris Wilson', 'Lisa Anderson'];

console.log('🔨 Generating sample data...');

const data = [['Customer ID', 'Customer Name', 'Phone Number', 'Gender', 'Age', 'Customer Region', 'Customer Type', 'Product ID', 'Product Name', 'Brand', 'Product Category', 'Tags', 'Quantity', 'Price per Unit', 'Discount Percentage', 'Total Amount', 'Final Amount', 'Date', 'Payment Method', 'Order Status', 'Delivery Type', 'Store ID', 'Store Location', 'Salesperson ID', 'Employee Name']];

for (let i = 1; i <= 5000; i++) {
  const qty = Math.floor(Math.random() * 10) + 1;
  const price = Math.floor(Math.random() * 5000) + 500;
  const discount = Math.floor(Math.random() * 30);
  const total = qty * price;
  const final = total * (1 - discount / 100);
  const region = regions[Math.floor(Math.random() * regions.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  data.push([
    `CUST${String(i).padStart(6, '0')}`,
    names[Math.floor(Math.random() * names.length)],
    `9${Math.floor(Math.random() * 900000000) + 100000000}`,
    genders[Math.floor(Math.random() * genders.length)],
    Math.floor(Math.random() * 50) + 20,
    region,
    Math.random() > 0.5 ? 'Regular' : 'Premium',
    `PROD${String(i).padStart(6, '0')}`,
    category + ' Product',
    'Brand' + (Math.floor(Math.random() * 5) + 1),
    category,
    category,
    qty,
    price,
    discount,
    total,
    final.toFixed(2),
    `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    payments[Math.floor(Math.random() * payments.length)],
    statuses[Math.floor(Math.random() * statuses.length)],
    Math.random() > 0.5 ? 'Home Delivery' : 'Store Pickup',
    `STORE${Math.floor(Math.random() * 10) + 1}`,
    region,
    `EMP${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
    names[Math.floor(Math.random() * names.length)]
  ]);
}

const csv = data.map(row => row.join(',')).join('\n');
const dataPath = path.join(__dirname, '../data/sales_data.csv');
fs.writeFileSync(dataPath, csv);
console.log(`✅ Generated ${data.length - 1} sample records`);
console.log(`📁 File saved to: ${dataPath}`);
