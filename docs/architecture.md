# System Architecture Documentation

## Backend Architecture

### Overview
The backend follows a **layered MVC architecture** with clear separation of concerns across routes, controllers, services, and utilities.

### Architecture Layers

**1. Routes Layer** (`src/routes/`)
- Defines API endpoints and HTTP methods
- Maps requests to appropriate controllers
- Handles initial data loading on server startup

**2. Controllers Layer** (`src/controllers/`)
- Receives HTTP requests from routes
- Validates request parameters
- Calls service layer for business logic
- Formats and sends HTTP responses
- Handles error responses

**3. Services Layer** (`src/services/`)
- Contains core business logic
- Implements search, filter, sort, and pagination algorithms
- Processes data transformations
- Returns structured data to controllers

**4. Utils Layer** (`src/utils/`)
- CSV data loading and parsing
- Data caching in memory for fast access
- Helper functions and utilities

### Data Flow (Backend)

Client Request
↓
Routes (salesRoutes.js)
↓
Controllers (salesController.js)
↓
Services (salesService.js)
↓
Utils (dataLoader.js - in-memory data)
↓
Services (process & filter data)
↓
Controllers (format response)
↓
Client Response (JSON)



### Key Design Decisions

**1. In-Memory Data Storage**
- CSV data loaded once at startup
- Stored in memory for fast query performance
- Trade-off: Memory usage vs. speed (acceptable for 1M records)

**2. Server-Side Processing**
- All filtering, sorting, and pagination done on server
- Reduces client-side load
- Ensures consistent behavior across clients

**3. Stateless API**
- Each request is independent
- No session management required
- Easy to scale horizontally

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
- **SalesTable**: Data display with formatted columns
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
API Service Call
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
- Active filters object
- Current sort option
- Current page number
- Loading status
- Sales data array
- Filter options

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

Click filter, type search, change sort, click page

State Update (React)

Local state updated via useState

API Call (Axios)

GET /api/sales?search=john&gender=Male&sortBy=date&page=1

Backend Processing

Route receives request

Controller extracts parameters

Service filters data from memory

Service applies search logic

Service sorts results

Service paginates (slice array)

Controller formats response

Response (JSON)
{
data: [...10 items],
pagination: {
currentPage: 1,
totalPages: 100,
totalItems: 1000,
itemsPerPage: 10
}
}

Frontend Update

Update salesData state

Update pagination state

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
│ ├── routes/
│ │ └── salesRoutes.js # API endpoints
│ ├── utils/
│ │ └── dataLoader.js # CSV parser & data cache
│ └── index.js # Server entry point
├── data/
│ └── sales_data.csv # Source data
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
│ │ └── api.js # API client
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
- Start HTTP server

**salesRoutes.js**
- Define `/api/sales` GET endpoint
- Define `/api/sales/filters` GET endpoint
- Load CSV data on startup
- Route requests to controllers

**salesController.js**
- `getSales()`: Handle sales data requests
- `getFilters()`: Return available filter options
- Error handling and response formatting

**salesService.js**
- `searchAndFilterSales()`: Main data processing function
  - Search logic
  - Filter logic (multi-criteria)
  - Sort logic
  - Pagination logic
- `getUniqueValues()`: Extract distinct filter values

**dataLoader.js**
- `loadSalesData()`: Parse CSV and cache in memory
- `getSalesData()`: Retrieve cached data

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
- Display filter options
- Manage local filter state
- Emit filter changes to parent

**SalesTable.jsx**
- Render tabular data
- Format currency, dates, status
- Handle empty states

**SortDropdown.jsx**
- Display sort options
- Emit sort selection to parent

**Pagination.jsx**
- Display page controls
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
- In-memory data storage for O(1) access
- Efficient filtering using Array methods
- Pagination reduces response size
- Single CSV load at startup

**Frontend:**
- Debounced search to reduce API calls
- Conditional rendering for loading states
- CSS for smooth UI transitions
- Minimal re-renders with proper state management

---

## Scalability Notes

**Current Implementation:**
- Suitable for datasets up to 10M records in memory
- Single-server deployment

**Future Enhancements:**
- Database integration (PostgreSQL/MongoDB)
- Redis caching layer
- Load balancing for multiple backend instances
- WebSocket for real-time updates
- Server-side rendering (SSR) for SEO
