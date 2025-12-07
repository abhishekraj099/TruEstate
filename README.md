# TruEstate Sales Management System

A full-stack sales management system with advanced search, filtering, sorting, and pagination capabilities built for managing retail sales data.

## Overview

This application provides a comprehensive interface for viewing and analyzing sales transactions with real-time filtering, multi-criteria search, and efficient data pagination. It uses a React + Vite frontend and a Node.js + Express backend that operate on a CSV-based sample dataset loaded into memory.

## Tech Stack

**Frontend:**
- React.js
- Vite (build tool + dev server)
- Axios (API calls)
- CSS3 (styling)

**Backend:**
- Node.js
- Express.js
- csv-parser (data processing)
- CORS & dotenv

## Search Implementation

The search functionality performs case-insensitive matching across Customer Name and Phone Number fields. It works together with active filters and sorting, and when the search box is cleared, results fall back to the current filtered dataset.

## Filter Implementation

Multi-criteria filters support:
- Customer Region (dropdown)
- Gender (dropdown)
- Product Category (dropdown)
- Payment Method (dropdown)
- Age Range (min–max numeric inputs)
- Date Range (start–end date picker)

All filters can be combined, and their state is preserved when changing search or sort options.

## Sorting Implementation

Available sorting options:
- **Date (Newest First)** – date descending
- **Quantity** – quantity descending
- **Customer Name (A–Z)** – alphabetical by customer name

Sorting respects the current search query and filters.

## Pagination Implementation

Server-side pagination with 10 items per page:
- Previous/Next navigation
- Current page and total pages display
- Pagination state preserved when changing filters/search/sort
- Boundary buttons disabled on first/last page

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm

### Backend Setup

cd backend
npm install
node scripts/generateSample.js # generate sample sales_data.csv (5K rows)
npm run dev # runs at http://localhost:5000


### Frontend Setup

Create `.env` inside `frontend`:


VITE_API_URL=http://localhost:5000/api



Then:

cd frontend
npm install
npm run dev # runs at http://localhost:5173


### Full Application (Local)

1. Start the backend on port 5000.
2. Start the frontend on port 5173.
3. Open `http://localhost:5173` in the browser.

## Project Structure


truestate-sales-system/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── index.js
│ ├── data/
│ │ └── sales_data.csv
│ └── scripts/
│ └── generateSample.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── vite.config.js
└── docs/
└── architecture.md



## Live Demo

- Frontend: `https://truestate-frontend.vercel.app`
- Backend API: `https://truestate-backend.vercel.app/api/sales`
