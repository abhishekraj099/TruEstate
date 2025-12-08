import express from 'express';
import { 
  getSales, 
  getFilters, 
  getAnalytics, 
  getCategoryAnalytics 
} from '../controllers/salesController.js';

const router = express.Router();

router.get('/sales', getSales);
router.get('/filters', getFilters);

router.get('/analytics/region', getAnalytics);
router.get('/analytics/category', getCategoryAnalytics);

export default router;
