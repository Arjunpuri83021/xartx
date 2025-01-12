import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import BannerAd from "../Adds/BannerAdd";
import { FaHandPointer } from "react-icons/fa";
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

function NewVideos() {
  const [postdata, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 16;

  const fetchData = async (page = 1, search = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${apiUrl}/getnewVideos?page=${page}&limit=${itemsPerPage}&search=${search}`,
        { mode: "cors" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPostData(data.records);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchData(1, term);
  };

  const debouncedSearch = (() => {
    let timeoutId;
    return (term) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleSearch(term), 300);
    };
  })();

  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber, searchTerm);
    window.scrollTo(0, 0);
  };

  const handleCardClick = async (id, currentViews) => {
    try {
      const updatedViews = (currentViews || 0) + 1;
      const updatedPosts = postdata.map((item) =>
        item._id === id ? { ...item, views: updatedViews } : item
      );
      setPostData(updatedPosts);

      await fetch(`${apiUrl}/updateviews/${id}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ views: updatedViews }),
      });
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // First Section
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
      // Middle Section
      else if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
      // Last Section
      else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers.map((pageNumber, index) =>
      typeof pageNumber === "number" ? (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          className={`page-button ${currentPage === pageNumber ? "active" : ""}`}
        >
          {pageNumber}
        </button>
      ) : (
        <span key={index} className="dots">
          {pageNumber}
        </span>
      )
    );
  };

  return (
    <>
      {/* <Helmet>
        <title>trisha paytas porn missax pregnant hentai tecavüz porno | Hexmy</title>
        <meta
          name="description"
          content="tnaboard turkish subtitled porn livvy dunne nude subtitled porn subtitled porn fullporner xxxx video aunty sex gulf sex outdoor sex sexy movie super movie"
        />
      </Helmet> */}

      <Navbar onSearch={(term) => debouncedSearch(term)} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div id="ad-container" className="all-cards">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {postdata.map((items) => (
            <div
              className="col"
              key={items._id}
              onClick={() => handleCardClick(items._id, items.views)}
            >
              <Link to={`/playVideo/${items._id}`}>
                <div className="card">
                  <img
                    style={{ height: "250px" }}
                    src={items.imageUrl}
                    className="card-img-top position-relative"
                    alt={
                      items.altKeywords && items.altKeywords.trim() !== ""
                        ? items.altKeywords
                        : items.titel
                    }
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

                  <h1 className="p-0 m-0 text-light mt-2">
                    {items.titel} / Provided By: HexMy
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
          <button onClick={() => handlePageChange(currentPage - 1)} className="nav-button">
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="nav-button">
            Next
          </button>
        )}
      </div>

      <Footer />
    </>
  );
}

export default NewVideos;
