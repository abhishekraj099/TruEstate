import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getSalesData = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sales`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    // backend route is /api/filters, not /api/sales/filters
    const response = await axios.get(`${API_BASE_URL}/filters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};
