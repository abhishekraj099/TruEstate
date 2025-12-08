import express from 'express';
import { 
  getSales, 
  getFilters, 
  getAnalytics, 
  getCategoryAnalytics 
} from '../controllers/salesController.js';

const router = express.Router();

// Main routes
router.get('/sales', getSales);
router.get('/filters', getFilters);

// Analytics routes
router.get('/analytics/region', getAnalytics);
router.get('/analytics/category', getCategoryAnalytics);

export default router;
