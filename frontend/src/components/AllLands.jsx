import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import { getAllLands } from '../utils/api';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const navigate = useNavigate();
  const [landdata, setLandData] = useState([]);
  const [filters, setFilters] = useState({ location: '', khatianNo: '', budget: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const currentUserId = localStorage.getItem('userid');

  const FetchLands = async () => {
    try {
      const res = await getAllLands();
      setLandData(res.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
 const handlleShowDetails = (id) => {
   navigate(`/land/${id}`);
 }
  useEffect(() => {
    FetchLands();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredLands = landdata.filter(land => {
    const locationMatch = !filters.location || (land.location && land.location.toLowerCase().includes(filters.location.toLowerCase()));
    const khatianMatch = !filters.khatianNo || (land.khatianNo && land.khatianNo.includes(filters.khatianNo));
    const budgetMatch = !filters.budget || (land.amount && land.amount <= Number(filters.budget));
    const typeMatch = !filters.type || (land.salerId?.farmerType && land.salerId.farmerType === filters.type);
    return locationMatch && khatianMatch && budgetMatch && typeMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MainLayout>
      <section className="container mt-4">
        <h2 className="mb-4">Available Land Deals</h2>
        <div className="mb-4 p-3 bg-light rounded">
          <div className="row g-3">
            <div className="col-md-3">
              <input type="text" name="location" className="form-control" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
            </div>
            <div className="col-md-2">
              <input type="text" name="khatianNo" className="form-control" placeholder="Khatian No" value={filters.khatianNo} onChange={handleFilterChange} />
            </div>
            <div className="col-md-2">
              <input type="number" name="budget" className="form-control" placeholder="Max Budget" value={filters.budget} onChange={handleFilterChange} />
            </div>
            <div className="col-md-2">
              <select name="type" className="form-select" value={filters.type} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {currentItems.length === 0 ? (
            <p>No matching land records found.</p>
          ) : (
            currentItems.map((land, index) => {
              const isNotPostedByCurrentUser = land.salerId?._id !== currentUserId;
              return (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100">
                    <img
                      src={land.documents?.[0] || "https://via.placeholder.com/400"}
                      className="card-img-top"
                      alt="Land"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">₹{land.amount.toLocaleString()}</h5>
                      <p className="card-text">{land.location}</p>
                      <p className="card-text"><small>Khatian No: {land.khatianNo}</small></p>
                      <p className="card-text"><small>Type: {land.salerId?.farmerType || 'N/A'}</small></p>

                      {isNotPostedByCurrentUser? (
                        <div className="mt-3 d-flex justify-content-between">
                          {land.isSale ? (
                            <p className="text-danger fw-bold ">Sold</p>
                          ):""}
                          <button onClick={() => handlleShowDetails(land._id)} className="btn btn-sm btn-outline-primary">{land.isSale ? "Show Details" : "Apply And Show Details"}</button>
                        </div>
                      ):<p className='text-center text-info'>Posted By You</p>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {[...Array(totalPages).keys()].map((num) => (
                <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(num + 1)}>{num + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>
    </MainLayout>
  );
};

export default Services;
