# Backend - TruEstate Sales Management System

REST API for sales data management with filtering, search, sorting, and pagination.

## API Endpoints

### GET `/api/sales`
Fetch sales data with optional query parameters.

**Query Parameters:**
- `search` - Search by customer name or phone
- `region` - Filter by customer region
- `gender` - Filter by gender
- `category` - Filter by product category
- `paymentMethod` - Filter by payment method
- `minAge`, `maxAge` - Filter by age range
- `startDate`, `endDate` - Filter by date range
- `sortBy` - Sort by: `date`, `quantity`, or `name`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**

### GET `/api/sales/filters`
Get available filter options (regions, categories, payment methods, etc.)

## Setup


Server runs on port 5000.


## Dataset Setup

⚠️ **Important**: The CSV data file is not included in the repository due to size constraints.

1. Download the dataset from: [Google Drive Link](https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing)
2. Place the downloaded file in `backend/data/` folder
3. Rename it to `sales_data.csv`

The backend will not work without this file.
