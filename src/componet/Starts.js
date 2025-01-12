import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import HilltopAdsBanner from "../Adds/BannerAdd";
import VideoSliderAd from "../Adds/BannerAdd2";
import BannerAd from "../Adds/BannerAdd";
const apiUrl = process.env.REACT_APP_API_URL;

function Starts() {
  const [starUrl, setStarUrl] = useState('');
  const [starName, setStarName] = useState('');
  const [starLike, setStarLike] = useState('');
  const [starImgUrl, setStarImgUrl] = useState('');
  const [stars, setStars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`${apiUrl}/getstars`);
      const data = await response.json();
      setStars(data);
    } catch (error) {
      console.error('Error fetching stars:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  const filteredStars = stars.filter((item) => {
    const starNameMatch = item.starName && item.starName.toLowerCase().includes(searchTerm.toLowerCase());
    return starNameMatch;
  });

  const totalPages = Math.ceil(filteredStars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStars = filteredStars.slice(startIndex, startIndex + itemsPerPage);

  const renderPageNumbers = () => {
    let pageNumbers = [];
  
    // If currentPage is less than 2, display 3 buttons starting from 1
    if (currentPage <= 2) {
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
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
    }
    // If currentPage is near the end, show the last 3 pages
    else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
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
    }
    // Otherwise, show the current page in the middle with 1 page before and after
    else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
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
    }
  
    return pageNumbers;
  };


  


  return (
    <>
    
      <Navbar onSearch={handleSearch} />
         
   
     
      <div id="ad-container" className="all-cards">
        <div className="row row-cols-2 row-cols-md-5 g-4">
          {currentStars.map((item) => (
            <div className="col" key={item._id}>
              <Link to={item.starurl} key={item._id}>
                <div className="card" style={{ height: "250px" }}>
                  <img style={{ height: "227px", position: "relative" }} src={item.starImgUrl} className="card-img-top" alt={item.starName} />
                  <span className="text-light p-1" style={{ position: "absolute", opacity: "70%" }} ><i style={{ color: "#ff0099" }} className="bi bi-hand-thumbs-up-fill"></i>{item.likes}</span>
                  <p style={{ color: "#ff0099" }} className="p-0 m-0">{item.starName}</p>
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
      {/* <iframe className="mt-3"
        src="//a.magsrv.com/iframe.php?idzone=5371288&size=300x250"
        width={300}
        height={250}
        scrolling="no"
        marginWidth={0}
        marginHeight={0}
        frameBorder={0}
      /> */}
      <Footer />
    </>
  );
}

export default Starts;
