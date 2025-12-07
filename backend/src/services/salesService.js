import { getSalesData } from '../utils/dataLoader.js';

export const searchAndFilterSales = (query) => {
  let data = getSalesData();
  const { search, page = 1, limit = 10, sortBy, ...filters } = query;

  // SEARCH - Customer Name or Phone Number
  if (search) {
    const searchLower = search.toLowerCase();
    data = data.filter(item => 
      (item['Customer Name']?.toLowerCase().includes(searchLower)) ||
      (item['Phone Number']?.toLowerCase().includes(searchLower))
    );
  }

  // FILTERS - Multi-select
  if (filters.region) {
    const regions = Array.isArray(filters.region) ? filters.region : [filters.region];
    data = data.filter(item => regions.includes(item['Customer Region']));
  }

  if (filters.gender) {
    const genders = Array.isArray(filters.gender) ? filters.gender : [filters.gender];
    data = data.filter(item => genders.includes(item['Gender']));
  }

  if (filters.category) {
    const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
    data = data.filter(item => categories.includes(item['Product Category']));
  }

  if (filters.paymentMethod) {
    const methods = Array.isArray(filters.paymentMethod) ? filters.paymentMethod : [filters.paymentMethod];
    data = data.filter(item => methods.includes(item['Payment Method']));
  }

  if (filters.minAge || filters.maxAge) {
    data = data.filter(item => {
      const age = parseInt(item['Age']);
      if (filters.minAge && age < parseInt(filters.minAge)) return false;
      if (filters.maxAge && age > parseInt(filters.maxAge)) return false;
      return true;
    });
  }

  if (filters.startDate || filters.endDate) {
    data = data.filter(item => {
      const itemDate = new Date(item['Date']);
      if (filters.startDate && itemDate < new Date(filters.startDate)) return false;
      if (filters.endDate && itemDate > new Date(filters.endDate)) return false;
      return true;
    });
  }

  // SORTING
  if (sortBy === 'date') {
    data.sort((a, b) => new Date(b['Date']) - new Date(a['Date']));
  } else if (sortBy === 'quantity') {
    data.sort((a, b) => parseInt(b['Quantity']) - parseInt(a['Quantity']));
  } else if (sortBy === 'name') {
    data.sort((a, b) => a['Customer Name']?.localeCompare(b['Customer Name']));
  }

  // PAGINATION
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems,
      itemsPerPage: parseInt(limit)
    }
  };
};

export const getUniqueValues = () => {
  const data = getSalesData();
  
  return {
    regions: [...new Set(data.map(item => item['Customer Region']))].filter(Boolean),
    genders: [...new Set(data.map(item => item['Gender']))].filter(Boolean),
    categories: [...new Set(data.map(item => item['Product Category']))].filter(Boolean),
    paymentMethods: [...new Set(data.map(item => item['Payment Method']))].filter(Boolean),
    tags: [...new Set(data.flatMap(item => item['Tags']?.split(',').map(t => t.trim())))].filter(Boolean)
  };
};
