import { useState } from 'react';

function FilterPanel({ filters, filterOptions, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState({});

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...localFilters };
    
    if (value === '' || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[filterName];
    } else {
      newFilters[filterName] = value;
    }
    
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={clearFilters} className="clear-button">Clear All</button>
      </div>

      <div className="filter-group">
        <label>Customer Region</label>
        <select 
          onChange={(e) => handleFilterChange('region', e.target.value)}
          value={localFilters.region || ''}
        >
          <option value="">All Regions</option>
          {filterOptions.regions?.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Gender</label>
        <select 
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          value={localFilters.gender || ''}
        >
          <option value="">All Genders</option>
          {filterOptions.genders?.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Product Category</label>
        <select 
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={localFilters.category || ''}
        >
          <option value="">All Categories</option>
          {filterOptions.categories?.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Payment Method</label>
        <select 
          onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
          value={localFilters.paymentMethod || ''}
        >
          <option value="">All Methods</option>
          {filterOptions.paymentMethods?.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Age Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => handleFilterChange('minAge', e.target.value)}
            value={localFilters.minAge || ''}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => handleFilterChange('maxAge', e.target.value)}
            value={localFilters.maxAge || ''}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-inputs">
          <input
            type="date"
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            value={localFilters.startDate || ''}
          />
          <span>to</span>
          <input
            type="date"
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            value={localFilters.endDate || ''}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
