import { searchAndFilterSales, getUniqueValues } from '../services/salesService.js';

export const getSales = (req, res) => {
  try {
    const result = searchAndFilterSales(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilters = (req, res) => {
  try {
    const filters = getUniqueValues();
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
