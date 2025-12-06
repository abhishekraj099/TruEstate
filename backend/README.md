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
