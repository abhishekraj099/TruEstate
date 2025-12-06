function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-dropdown">
      <label>Sort by:</label>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Default</option>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="name">Customer Name (A-Z)</option>
      </select>
    </div>
  );
}

export default SortDropdown;
