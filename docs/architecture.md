# System Architecture Documentation

## Backend Architecture

### Overview
The backend follows a **layered MVC architecture** with clear separation of concerns across routes, controllers, services, models, and utilities.

### Architecture Layers

**1. Routes Layer** (`src/routes/`)
- Defines API endpoints and HTTP methods
- Maps requests to appropriate controllers
- Mounts routes under `/api` prefix

**2. Controllers Layer** (`src/controllers/`)
- Receives HTTP requests from routes
- Validates request parameters
- Calls service layer for business logic
- Formats and sends HTTP responses
- Handles error responses

**3. Services Layer** (`src/services/`)
- Contains core business logic
- Implements search, filter, sort, and pagination algorithms
- Performs MongoDB queries and aggregations
- Processes data transformations
- Returns structured data to controllers

**4. Models Layer** (`src/models/`)
- Defines Mongoose schemas for MongoDB collections
- Enforces data validation and indexing
- Provides abstraction over database operations

**5. Utils Layer** (`src/utils/`)
- CSV data loading and parsing (for initial import)
- Data transformation helpers
- Connection management utilities

### Data Flow (Backend)

Client Request
↓
Routes (salesRoutes.js)
↓
Controllers (salesController.js)
↓
Services (salesService.js)
↓
Models (Sales.js - Mongoose)
↓
MongoDB Atlas (truestate_db.sales)
↓
Services (process & transform data)
↓
Controllers (format response)
↓
Client Response (JSON)



### Key Design Decisions

**1. MongoDB Atlas Storage**
- Data stored in cloud-hosted MongoDB Atlas
- Indexed fields for fast query performance (region, category, date, payment method, etc.)
- Trade-off: Network latency vs. persistent storage and scalability

**2. Server-Side Processing**
- All filtering, sorting, and pagination done on server
- Reduces client-side load
- Ensures consistent behavior across clients
- Leverages MongoDB aggregation pipelines for analytics

**3. Stateless API**
- Each request is independent
- No session management required
- Easy to scale horizontally

**4. CSV Loader Utility**
- One-time data import from CSV to MongoDB
- Converts CSV rows into properly typed MongoDB documents
- Safe date and number parsing during import

---

## Frontend Architecture

### Overview
The frontend uses **React with functional components and hooks** for state management and side effects.

### Component Structure

**1. App Component** (`App.jsx`)
- Root component managing global state
- Coordinates all child components
- Handles API calls and data fetching
- Manages search, filter, sort, and pagination state

**2. Presentational Components** (`components/`)
- **SearchBar**: User input for search queries
- **FilterPanel**: Multi-select filters with state management
- **SalesTable**: Data display with formatted columns (currency, dates, status)
- **SortDropdown**: Sorting option selector
- **Pagination**: Page navigation controls

**3. Service Layer** (`services/`)
- API communication using Axios
- Centralized HTTP request handling
- Error handling and logging

**4. Styles** (`styles/`)
- Component-specific CSS
- Responsive design utilities
- Theme variables

### Data Flow (Frontend)

User Interaction
↓
Component Event Handler
↓
Update Local State (useState)
↓
Trigger Effect (useEffect)
↓
API Service Call (Axios)
↓
Backend API
↓
Response Data
↓
Update Component State
↓
Re-render UI


### State Management

**Local Component State:**
- Search term
- Active filters object (region, gender, category, payment method, age range, date range)
- Current sort option
- Current page number
- Loading status
- Sales data array
- Filter options (regions, genders, categories, payment methods, tags)

**State Update Flow:**
1. User interacts with UI (search, filter, sort, paginate)
2. Event handler updates relevant state
3. `useEffect` detects state change
4. API call triggered with updated parameters
5. Response updates data state
6. Components re-render with new data

---

## Data Flow (End-to-End)

### Request Flow
User Action (Frontend)
↓
Click filter, type search, change sort, click page
↓
State Update (React)
↓
Local state updated via useState
↓
API Call (Axios)
↓
GET /api/sales?search=john&gender=Male&sortBy=date&page=1
↓
Backend Processing
↓
Route receives request
↓
Controller extracts parameters
↓
Service builds MongoDB query with filters
↓
Service applies search logic (regex on name/phone)
↓
Service sorts results (MongoDB sort)
↓
Service paginates (skip + limit)
↓
Controller formats response
↓
Response (JSON)
{
"data": [...10 items],
"pagination": {
"currentPage": 1,
"totalPages": 500,
"totalItems": 5000,
"itemsPerPage": 10
}
}
↓
Frontend Update
↓
Update salesData state
↓
Update pagination state
↓
Re-render components



---

## Folder Structure

### Backend

backend/
├── src/
│ ├── controllers/
│ │ └── salesController.js # Request handlers
│ ├── services/
│ │ └── salesService.js # Business logic
│ ├── models/
│ │ └── Sales.js # Mongoose schema
│ ├── routes/
│ │ └── salesRoutes.js # API endpoints
│ ├── config/
│ │ └── db.config.js # MongoDB connection
│ ├── utils/
│ │ └── dataLoader.js # CSV → MongoDB loader
│ └── index.js # Server entry point
├── data/
│ └── sales_data.csv # Source data (for import)
├── scripts/
│ └── loadData.js # CSV import script
├── package.json
└── README.md


### Frontend


frontend/
├── src/
│ ├── components/
│ │ ├── SearchBar.jsx # Search input
│ │ ├── FilterPanel.jsx # Filter controls
│ │ ├── SalesTable.jsx # Data table
│ │ ├── SortDropdown.jsx # Sort selector
│ │ └── Pagination.jsx # Page navigation
│ ├── services/
│ │ └── api.js # API client (Axios)
│ ├── styles/
│ │ └── App.css # Global styles
│ ├── App.jsx # Root component
│ └── main.jsx # React entry point
├── public/
├── index.html # HTML template
├── vite.config.js # Build config
├── package.json
└── README.md


---

## Module Responsibilities

### Backend Modules

**index.js**
- Initialize Express app
- Configure middleware (CORS, JSON parser)
- Register routes
- Connect to MongoDB Atlas
- Start HTTP server

**db.config.js**
- Mongoose connection setup
- Connection string from environment variable
- Error handling and logging

**salesRoutes.js**
- Define `/api/sales` GET endpoint
- Define `/api/filters` GET endpoint
- Define `/api/analytics/region` and `/api/analytics/category` endpoints
- Route requests to controllers

**salesController.js**
- `getSales()`: Handle sales data requests
- `getFilters()`: Return available filter options
- `getAnalytics()`: Return regional analytics
- `getCategoryAnalytics()`: Return category analytics
- Error handling and response formatting

**salesService.js**
- `searchAndFilterSales()`: Main data processing function
  - Build MongoDB query from filters
  - Search logic (regex on customerName/phoneNumber)
  - Sort logic (MongoDB sort options)
  - Pagination logic (skip + limit)
- `getUniqueValues()`: Extract distinct filter values using `distinct()`
- `getSalesAnalytics()`: Aggregation by customer region
- `getCategoryStats()`: Aggregation by product category

**Sales.js (Model)**
- Mongoose schema definition for sales documents
- Field types, indexes, and validation rules
- Collection name mapping (`sales`)

**dataLoader.js**
- `loadCSVToDatabase()`: Parse CSV and insert into MongoDB
- Safe parsing of dates and numeric fields
- Batch insertion for performance

### Frontend Modules

**main.jsx**
- React app initialization
- Render root component

**App.jsx**
- Global state management
- Coordinate all child components
- API orchestration
- Effect management for data fetching

**SearchBar.jsx**
- Capture user search input
- Emit search events to parent

**FilterPanel.jsx**
- Display filter options (dropdowns, inputs, date pickers)
- Manage local filter state
- Emit filter changes to parent

**SalesTable.jsx**
- Render tabular data
- Format currency, dates, status
- Handle empty states

**SortDropdown.jsx**
- Display sort options (date, quantity, name)
- Emit sort selection to parent

**Pagination.jsx**
- Display page controls (Previous/Next)
- Handle page navigation
- Disable buttons at boundaries

**api.js**
- Axios instance configuration
- `getSalesData()`: Fetch sales with params
- `getFilterOptions()`: Fetch filter metadata
- Error handling

---

## Performance Considerations

**Backend:**
- MongoDB Atlas with indexed fields for fast queries (region, category, date, payment method, etc.)
- Efficient filtering using MongoDB query operators
- Pagination reduces response size (skip + limit)
- Aggregation pipelines for analytics

**Frontend:**
- Debounced search to reduce API calls
- Conditional rendering for loading states
- CSS for smooth UI transitions
- Minimal re-renders with proper state management

---

## Scalability Notes

**Current Implementation:**
- Suitable for datasets from thousands to millions of records
- MongoDB Atlas cluster (can scale vertically and horizontally)
- Vercel serverless functions for backend (auto-scaling)

## Live Demo

- **Frontend (Vercel):**  
  https://truestate-frontend.vercel.app

- **Backend API (Vercel):**  
  https://truestate-backend.vercel.app/api/sales


