import React, { useState, useEffect } from 'react';
import './DataGrid.css';

const DataGrid = ({ apiEndpoint, columns }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchWord, setSearchWord] = useState('');
  const [filterAttribute, setFilterAttribute] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchWord, filterAttribute, filterValue, sortBy, sortOrder]);

  const fetchData = async () => {
    const queryParams = `_page=${currentPage}&_limit=${pageSize}&_sort=${sortBy}&_order=${sortOrder}`;
    const searchParams = searchWord ? `q=${searchWord}` : '';
    const filterParams = filterAttribute && filterValue ? `${filterAttribute}=${filterValue}` : '';
    const url = `${apiEndpoint}?${queryParams}&${searchParams}&${filterParams}`;

    const response = await fetch(url);
    const totalItems = response.headers.get('X-Total-Count');
    setTotalPages(Math.ceil(totalItems / pageSize));

    const jsonData = await response.json();
    setData(jsonData);
  };

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleFilterAttributeChange = (e) => {
    setFilterAttribute(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSort = (columnName) => {
    setSortBy(columnName);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <div>
        <input type="text" placeholder="Search" value={searchWord} onChange={handleSearchChange} />
        <select value={filterAttribute} onChange={handleFilterAttributeChange}>
          <option value="">Select Attribute</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Filter Value" value={filterValue} onChange={handleFilterValueChange} />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                <button onClick={() => handleSort(column)}>{column}</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={`${item.id}-${column}`}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="pagination-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DataGrid;