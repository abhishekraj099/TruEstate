import { 
  searchAndFilterSales, 
  getUniqueValues, 
  getSalesAnalytics, 
  getCategoryStats 
} from '../services/salesService.js';

export const getSales = async (req, res) => {
  try {
    const result = await searchAndFilterSales(req.query);
    res.json(result);
  } catch (error) {
    console.error('Get sales error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getFilters = async (req, res) => {
  try {
    const filters = await getUniqueValues();
    res.json(filters);
  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await getSalesAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryAnalytics = async (req, res) => {
  try {
    const stats = await getCategoryStats();
    res.json(stats);
  } catch (error) {
    console.error('Get category analytics error:', error);
    res.status(500).json({ error: error.message });
  }
};
