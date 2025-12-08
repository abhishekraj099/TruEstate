# TruEstate Sales Management System

A full-stack sales management system with advanced search, filtering, sorting, analytics, and pagination capabilities built for managing retail sales data.

## Overview

This application provides a comprehensive interface for viewing and analyzing sales transactions with real-time filtering, multi-criteria search, and efficient server-side pagination. The frontend is built with React + Vite and the backend uses Node.js + Express with MongoDB Atlas as the data store (data loaded from a CSV into the `sales` collection).

## Tech Stack

**Frontend:**
- React.js
- Vite (build tool + dev server)
- Axios (API calls)
- CSS3 (styling)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose (ODM)
- csv-parser (CSV → MongoDB loader)
- CORS & dotenv (API access + configuration)

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
- MongoDB Atlas cluster and connection string

### Backend Setup

1. Create `backend/.env`:

MONGODB_URI="your MongoDB Atlas connection string (truestate_db)"
PORT=5000
NODE_ENV=development


## Live Demo

- **Frontend (Vercel):**  
  https://truestate-frontend.vercel.app

- **Backend API (Vercel):**  
  https://truestate-backend.vercel.app/api/sales
