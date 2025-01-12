import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FaHandPointer } from "react-icons/fa";
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

function Indians() {
  const [indians, setIndians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 16;

  const fetchData = () => {
    fetch(`${apiUrl}/getindians?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`, {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setIndians(data.records);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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

  const handleCardClick = (id, currentViews) => {
    const updatedPosts = indians.map((item) =>
      item._id === id ? { ...item, views: (currentViews || 0) + 1 } : item
    );
    setIndians(updatedPosts);

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
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating views:", error);
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
        <title>indian desi sex​ listctawler hdporn92 desi sex mms | Hexmy</title>
        <link rel="canonical" href="https://hexmy.com/indian" />
        <meta
          name="description"
          content="katiana kay porn hannahowo porn Egyptian Sex Iranian Pussy chochox Korean porn xlxx hentairead fullporner Iranian sex artofzoo breckie hill nude pinayflix"
        />
      </Helmet> */}

      <Navbar onSearch={handleSearch} />

      <div id="ad-container" className="all-cards">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {indians.map((item) => (
            <div
              className="col"
              key={item._id}
              onClick={() => handleCardClick(item._id, item.views)}
            >
              <Link to={`/playVideo/${item._id}`}>
                <div className="card">
                  <img
                    style={{ height: "250px" }}
                    src={item.imageUrl}
                    className="card-img-top position-relative"
                    alt={item.altKeywords?.trim() || item.titel}
                  />
                  <div
                    style={{ width: "90%" }}
                    className="d-flex justify-content-between mt-2 m-auto"
                  >
                    <span className="views">
                      <i className="bi bi-clock"></i> {item.minutes} Min
                    </span>
                    <span className="views">
                      <i className="bi bi-eye-fill"></i> {item.views || 0}
                    </span>
                  </div>
                  <h1 className="p-0 m-0 text-light mt-2">
                    {item.name}-{item.titel} /Provided By: HexMy
                  </h1>
                  <div className="card-body">
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
    </>
  );
}

export default Indians;
