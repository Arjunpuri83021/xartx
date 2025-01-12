import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FaHandPointer } from 'react-icons/fa';
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

function Hijabi() {
  const [Hijabi, setHijabi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 16;

  const fetchData = (page = 1, search = '') => {
    fetch(`${apiUrl}/getHijabi?page=${page}&limit=${itemsPerPage}&search=${search}`, {
      mode: 'cors',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setHijabi(data.records);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleCardClick = (id, currentViews) => {
    const updatedPosts = Hijabi.map(item =>
      item._id === id ? { ...item, views: (currentViews || 0) + 1 } : item
    );
    setHijabi(updatedPosts);

    fetch(`${apiUrl}/updateviews/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ views: (currentViews || 0) + 1 }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .catch((error) => {
        console.error('Error updating views:', error);
      });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {/* <Helmet>
        <title>Hot Movie Russian Sex Gulf Sex Iranian Sex Video | hexmy</title>
        <link rel="canonical" href="https://hexmy.com/hijabi" />
        <meta
          name="description"
          content="Sunny Leone sex video, sexx, american super sex movie, sex video, sex stories, aunt sex, super movie, sex video, iranian sex, xxx video, foreign sex hexmy"
        />
      </Helmet> */}

      <Navbar onSearch={handleSearch} />

      <div id="ad-container" className="all-cards">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {Hijabi.map((items) => (
            <div className="col" key={items._id} onClick={() => handleCardClick(items._id, items.views)}>
              <Link to={`/playVideo/${items._id}`}>
                <div className="card">
                  <img
                    style={{ height: "250px" }}
                    src={items.imageUrl}
                    className="card-img-top position-relative"
                    alt={items.altKeywords && items.altKeywords.trim() !== '' ? items.altKeywords : items.titel}
                  />
                  <div style={{ width: "90%" }} className="d-flex justify-content-between mt-2 m-auto">
                    <span className="views">
                      <i className="bi bi-clock"></i> {items.minutes} Min
                    </span>
                    <span className="views">
                      <i className="bi bi-eye-fill"></i> {items.views || 0}
                    </span>
                  </div>
                  <h1 className="p-0 m-0 text-light mt-2">{items.name}-{items.titel} /Provided By: HexMy</h1>
                  <div className="card-body">
                    <span style={{ top: "5%", padding: "2px 8px", right: "3%" }} className="position-absolute views">
                      <span style={{ fontSize: '0.9rem', color: '#ffff' }}>HD</span>
                    </span>
                    <span style={{ top: "5%", padding: "7px 10px", left: "3%", borderRadius: "50%" }} className="position-absolute views">
                      <FaHandPointer style={{ color: '#ffff', fontSize: '0.9rem' }} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="nav-button">Previous</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="nav-button">Next</button>
        )}
      </div>
    </>
  );
}

export default Hijabi;
