function SalesTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Final Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr key={index}>
              <td>{sale['Customer Name']}</td>
              <td>{sale['Phone Number']}</td>
              <td>{sale['Product Name']}</td>
              <td>{sale['Product Category']}</td>
              <td>{sale['Quantity']}</td>
              <td>${sale['Final Amount']}</td>
              <td>{sale['Payment Method']}</td>
              <td>{new Date(sale['Date']).toLocaleDateString()}</td>
              <td>
                <span className={`status ${sale['Order Status']?.toLowerCase()}`}>
                  {sale['Order Status']}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
