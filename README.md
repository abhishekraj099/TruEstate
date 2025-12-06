# TruEstate Sales Management System

A full-stack sales management system with advanced search, filtering, sorting, and pagination capabilities built for managing retail sales data.

## Overview

This application provides a comprehensive interface for viewing and analyzing sales transactions with real-time filtering, multi-criteria search, and efficient data pagination. Built with React frontend and Node.js backend to handle large-scale sales data efficiently.

## Tech Stack

**Frontend:**
- React.js (v19.2.1)
- Vite (Build tool)
- Axios (API calls)
- CSS3 (Styling)

**Backend:**
- Node.js
- Express.js
- CSV-parser (Data processing)
- CORS & Dotenv

## Search Implementation

The search functionality performs case-insensitive matching across Customer Name and Phone Number fields. It works seamlessly with active filters and sorting, updating results in real-time as users type. Empty searches reset to show all filtered results.

## Filter Implementation

Multi-select filters support:
- Customer Region (dropdown selection)
- Gender (dropdown selection)
- Product Category (dropdown selection)
- Payment Method (dropdown selection)
- Age Range (min-max numeric input)
- Date Range (start-end date picker)

All filters work independently and in combination. Filter state is preserved during search and sort operations.

## Sorting Implementation

Three sorting options available:
- **Date (Newest First)**: Sorts transactions by date in descending order
- **Quantity**: Sorts by quantity in descending order
- **Customer Name (A-Z)**: Alphabetical sorting by customer name

Sorting maintains active search queries and filter selections.

## Pagination Implementation

Server-side pagination with 10 items per page. Features:
- Previous/Next navigation buttons
- Current page indicator
- Total pages display
- Pagination state preserved across filter, search, and sort operations
- Disabled buttons at boundaries (first/last page)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Backend Setup


Backend runs on `http://localhost:5000`

### Frontend Setup

Frontend runs on `http://localhost:3000`

### Full Application
1. Start backend first (port 5000)
2. Start frontend (port 3000)
3. Open browser to `http://localhost:3000`

## Project Structure
truestate-sales-system/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── index.js
│ └── data/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── styles/
│ │ └── App.jsx
│ └── index.html
└── docs/


## Live Demo
- Frontend: [Your Vercel URL]
- Backend API: [Your Railway/Render URL]
