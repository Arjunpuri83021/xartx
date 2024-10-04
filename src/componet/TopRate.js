import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { FaHandPointer } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_API_URL;

const TopRate = () => {
  const [postdata, setPostData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const fetchData = () => {
    fetch(`${apiUrl}/getpostdata`, {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const reversedData = data.reverse().map((item) => ({
          ...item,
          views: item.views || 0,
        }));
        setPostData(reversedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (id, currentViews) => {
    const updatedPosts = postdata.map((item) =>
      item._id === id ? { ...item, views: (currentViews || 0) + 1 } : item
    );
    setPostData(updatedPosts);

    fetch(`${apiUrl}/updateviews/${id}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ views: (currentViews || 0) + 1 }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Views updated:", data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating views:", error);
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Filter posts with more than 100 views and match the search term
  const filteredPosts = postdata.filter((item) => {
    const videoNoMatch = item.videoNo.toString().includes(searchTerm);
    const titelMatch =
      item.titel && item.titel.toLowerCase().includes(searchTerm.toLowerCase());
    return item.views > 100 && (videoNoMatch || titelMatch);
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      } else if (i === 2 && currentPage > 3) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
    }
    return pageNumbers;
  };

  return (
    <>
      {/* Pass handleSearch to Navbar for search functionality */}
      <Navbar onSearch={handleSearch} />
      <h1>Top Rated Videos</h1>
      <div id="ad-container" className="all-cards">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {currentPosts.map((items) => (
            <div
              className="col"
              key={items._id}
              onClick={() => handleCardClick(items._id, items.views)}
            >
              <Link to={items.link}>
                <div className="card">
                  <img
                    src={items.imageUrl}
                    className="card-img-top position-relative"
                    alt={items.titel}
                  />

                  <div
                    style={{ width: "90%" }}
                    className="d-flex justify-content-between mt-2 m-auto"
                  >
                    <span className="views">
                      <i className="bi bi-clock"></i> {items.minutes} Min
                    </span>
                    <span className="views">
                      <i className="bi bi-eye-fill"></i> {items.views || 0}
                    </span>
                  </div>

                  <h1 className="p-0 m-0 text-light mt-2">{items.name}-{items.titel} /Provided By: HexMy</h1>
                  <div className="card-body">
                    <h5 className="card-title">Video No: {items.videoNo}</h5>
                    <span
                      style={{ top: "5%", padding: "2px 8px", right: "3%" }}
                      className="position-absolute views"
                    >
                      <span style={{ fontSize: "0.9rem", color: "#ffff" }}>
                        HD
                      </span>
                    </span>
                    <span
                      style={{
                        top: "5%",
                        padding: "7px 10px",
                        left: "3%",
                        borderRadius: "50%",
                      }}
                      className="position-absolute views"
                    >
                      <FaHandPointer
                        style={{ color: "#ffff", fontSize: "0.9rem" }}
                      />
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
          <button onClick={handlePreviousPage} className="nav-button">
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="nav-button">
            Next
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TopRate;
