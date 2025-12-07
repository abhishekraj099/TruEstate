# Backend – TruEstate Sales Management System

REST API for sales data management with server-side filtering, search, sorting, and pagination.

## API Endpoints

### GET `/api/sales`

Fetch sales data with optional query parameters.

**Query Parameters:**

- `search` – Search by customer name or phone (case-insensitive)
- `region` – Comma-separated customer regions (e.g. `North,East`)
- `gender` – Comma-separated genders
- `category` – Comma-separated product categories
- `paymentMethod` – Comma-separated payment methods
- `ageMin`, `ageMax` – Age range
- `dateFrom`, `dateTo` – Date range (YYYY-MM-DD)
- `sortBy` – `date` | `quantity` | `customerName`
- `sortOrder` – `asc` | `desc` (date defaults to `desc`)
- `page` – Page number (default: 1)
- `pageSize` – Items per page (default: 10)

**Response shape:**

{
"data": [...],
"pagination": {
"currentPage": 1,
"totalPages": 96,
"totalItems": 954,
"itemsPerPage": 10
}
}


### GET `/api/sales/filters`

Returns available filter options (regions, genders, categories, tags, payment methods).


{
"regions": [...],
"genders": [...],
"categories": [...],
"paymentMethods": [...],
"tags": [...]
}


## Setup

Server runs on port **5000** by default.



## Setup

Server runs on port **5000** by default.


cd backend
npm install
node scripts/generateSample.js # generate sample dataset (5K rows)
npm run dev # http://localhost:5000


## Dataset Setup

The assignment dataset is large, so the deployed version uses a representative sample CSV with the same schema.

- Sample file: `backend/data/sales_data.csv`
- Generated locally using: `backend/scripts/generateSample.js`
- Rows: 5,000 synthetic records covering all required fields

If you want to regenerate the dataset:

cd backend
node scripts/generateSample.js

The backend will not return data unless `backend/data/sales_data.csv` exists.
