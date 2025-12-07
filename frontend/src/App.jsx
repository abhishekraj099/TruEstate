import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';
import { getSalesData, getFilterOptions } from './services/api';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchTerm, filters, sortBy, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        ...filters,
        sortBy,
        page: currentPage,
        limit: 10
      };
      const response = await getSalesData(params);
      setSalesData(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TruEstate Sales Management System</h1>
      </header>
      
      <div className="app-container">
        <aside className="sidebar">
          <FilterPanel 
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </aside>
        
        <main className="main-content">
          <div className="controls">
            <SearchBar onSearch={handleSearch} />
            <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
          
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div className="results-info">
                Showing {salesData.length} of {totalItems} results
              </div>
              <SalesTable data={salesData} />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
