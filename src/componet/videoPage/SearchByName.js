import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Helmet } from "react-helmet";
import BannerAd from "../../Adds/BannerAdd";
import HillTopBanner from "../../Adds/HillTopBanner";

const apiUrl = process.env.REACT_APP_API_URL;

const SearchByName = () => {
  const { name } = useParams();
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    // Fetch results based on page and name
    fetch(`${apiUrl}/pornstar/${name}?page=${page}&limit=16`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setResults((prevResults) =>
          page === 1 ? data.records : [...prevResults, ...data.records] // Append data if not the first page
        );
        setTotalPages(data.totalPages); // Set total pages for pagination
        console.log("Fetched results:", data);

        // Set a random image if data is not empty
        if (data.records.length > 0) {
          const randomItem = data.records[Math.floor(Math.random() * data.records.length)];
          setRandomImage(randomItem.imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }, [name, page]);

  const handleCardClick = (postId, currentViews) => {
    const updatedResults = results.map((item) =>
      item._id === postId ? { ...item, views: (currentViews || 0) + 1 } : item
    );
    setResults(updatedResults);

    fetch(`${apiUrl}/updateviews/${postId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ views: (currentViews || 0) + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Views updated:", data);
      })
      .catch((error) => console.error("Error updating views:", error));
  };

  const handleShowMore = () => {
    // Increment page and update results by fetching the next set of data
    const nextPage = page + 1;
    setPage(nextPage); // Trigger re-fetch with next page number

    // Update the visible count as you load more
    setVisibleCount((prevCount) => prevCount + 16);
  };

  const handleSearch = (term) => {
    const formattedTerm = term.trim().toLowerCase();
    setSearchTerm(formattedTerm);
  };

  return (
    <>
      <Helmet>
        <title>{name.replace(/-/g, " ")} hot sex videos ,goodporn,4k anal,pornhits,sex18,xxxnx</title>
        <link rel="canonical" href={`https://hexmy.com/pornstar/${name}`} />
        <meta
          name="description"
          content={`${name.replace(/-/g, " ")} Free huge tits Porn Videos, Free ${name.replace(
            /-/g,
            " "
          )} family sex & Enjoy cheating bhabhi porn, big natural boobs, download vporn sex videos or stream sex hub and pornhut videos.`}
        />
      </Helmet>
      <Navbar onSearch={handleSearch} />
      <div style={{ marginTop: "60px" }}>
        {randomImage && (
          <div className="text-center mb-4 searchbyname-startImg">
            <img src={randomImage} alt={name} className="normal-img" />
            <div className="searchbyname-ImgRound">
              <img src={randomImage} alt={`${name} round`} className="round-img" />
            </div>
          </div>
        )}

        <h1 className="SearchByname-star">{name.replace(/-/g, " ")}</h1>
        <p className="video-count text-center">
          <i className="bi bi-film"></i> All time best {name} Videos
        </p>

        <div style={{ width: "100%" }} className="row row-cols-2 row-cols-md-4 g-4 mt-4 m-auto">
          {results.slice(0, visibleCount).map((item) => (
            <div className="col" key={item._id} onClick={() => handleCardClick(item._id, item.views)}>
              <Link to={`/playVideo/${item._id}`} onClick={() => handleCardClick(item._id, item.views)}>
                <div className="card">
                  <img
                    src={item.imageUrl}
                    className="card-img-top position-relative"
                    alt={item.altKeywords && item.altKeywords.trim() !== "" ? item.altKeywords : item.titel}
                  />
                  <div style={{ width: "90%" }} className="d-flex justify-content-between mt-2 m-auto">
                    <span className="views">
                      <i className="bi bi-clock"></i> {item.minutes} Min
                    </span>
                    <span className="views">
                      <i className="bi bi-eye-fill"></i> {item.views || 0}
                    </span>
                  </div>
                  <h5 className="text-light mt-2">{item.titel}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {page < totalPages && (
          <div className="text-center mt-4">
            <button onClick={handleShowMore} className="load-more-btn">
              Load More...
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchByName;
