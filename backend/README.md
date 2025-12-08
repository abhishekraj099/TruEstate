# Backend – TruEstate Sales Management System

REST API for sales data management with server-side filtering, search, sorting, analytics, and pagination.

## API Endpoints

### GET `/api/sales`

Fetch sales data with optional query parameters.

**Query Parameters:**

- `search` – Search by customer name or phone (case-insensitive)
- `region` – Comma-separated customer regions (e.g. `North,East`)
- `gender` – Comma-separated genders
- `category` – Comma-separated product categories
- `paymentMethod` – Comma-separated payment methods
- `minAge`, `maxAge` – Age range
- `startDate`, `endDate` – Date range (YYYY-MM-DD)
- `sortBy` – `date` | `quantity` | `name` (customer name)
- `page` – Page number (default: 1)
- `limit` – Items per page (default: 10)

**Response shape:**

{
"data": [...],
"pagination": {
"currentPage": 1,
"totalPages": 500,
"totalItems": 5000,
"itemsPerPage": 10
}
}



### GET `/api/filters`

Returns available filter options (regions, genders, categories, tags, payment methods).


{
"regions": [...],
"genders": [...],
"categories": [...],
"paymentMethods": [...],
"tags": [...]
}


### GET `/api/analytics/region`

Returns regional analytics (total revenue, order count, average order value) grouped by customer region.

### GET `/api/analytics/category`

Returns category analytics (total sales, total quantity, average price) grouped by product category.

## Setup

Server runs on port **5000** by default.

cd backend
npm install
npm run dev # http://localhost:5000


Environment variables (`backend/.env`):

MONGODB_URI="your MongoDB Atlas connection string for truestate_db"
PORT=5000
NODE_ENV=development


## Dataset Setup

The assignment dataset is stored in **MongoDB Atlas** (database `truestate_db`, collection `sales`) with ~5,000 records.

A CSV with the same schema is kept locally for development:

- Sample file: `backend/data/sales_data.csv`
- Loader script imports it into the `sales` collection in Atlas.

To (re)load the dataset during development:


cd backend
node scripts/loadData.js # reads backend/data/sales_data.csv and populates MongoDB


The backend will not return data until the `sales` collection in Atlas has been populated from `backend/data/sales_data.csv` or another valid source.

