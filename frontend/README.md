# Frontend – TruEstate Sales Management System

React-based user interface for browsing and analyzing sales data with search, filtering, sorting, and pagination.

## Components

- **SearchBar**: Search by customer name or phone number
- **FilterPanel**: Multi-criteria filter sidebar (region, gender, category, payment method, age, date)
- **SalesTable**: Data table with formatted sales records
- **SortDropdown**: Sorting options selector (date, quantity, customer name)
- **Pagination**: Navigation controls for paged results

## Setup (Development)

cd frontend
npm install
npm run dev


Runs by default on `http://localhost:5173`.

The frontend expects the backend API at:

- `VITE_API_URL` (env var), or
- `http://localhost:5000/api` as a fallback.

## Build

npm run build


Production build output is generated in the `dist/` folder (Vite default).
