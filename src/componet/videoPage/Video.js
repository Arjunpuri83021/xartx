import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

const Video = () => {
  const [videoData, setVideoData] = useState({});
  const [postdata, setPostData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullDescVisible, setIsFullDescVisible] = useState(false);

  const { id } = useParams();

  const fetchPostData = async (search = "", page = 1, limit = 16) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiUrl}/relatedpostData?search=${search}&page=${page}&limit=${limit}`,
        { mode: "cors" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post data");
      }
      const data = await response.json();
      setPostData((prev) => (page === 1 ? data.records : [...prev, ...data.records]));
      setTotalRecords(data.totalRecords);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching post data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch video details
    fetch(`${apiUrl}/getVideo/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
        // Fetch related posts using the video's `titel`
        fetchPostData(data.titel, 1);
      })
      .catch((error) => console.error("Error fetching video details:", error));
  }, [id]);

  const loadMorePosts = () => {
    fetchPostData(videoData.titel, currentPage + 1);
  };

  const toggleDescription = () => {
    setIsFullDescVisible(!isFullDescVisible);
  };

  return (
    <>
      <Helmet>
        <title>{videoData.titel}</title>
        <link rel="canonical" href="https://hexmy.com/playVideo" />
        <meta
          name="description"
          content={`${
            Array.isArray(videoData.name) && videoData.name.length > 0
              ? videoData.name.map((name) => name.replace(/-/g, " ")).join(" & ")
              : videoData.name
          }: ${
            videoData.desc && videoData.desc.length > 145
              ? `${videoData.desc.substring(0, 145)}...`
              : videoData.desc
          }`}
        />
      </Helmet>

      <Navbar />

      <Link to={videoData.link}>
        <div className="video-container">
          <h1>{videoData.titel}</h1>
          <img
            src={videoData.imageUrl}
            className="card-img-top video-img"
            alt={videoData.titel}
          />
          <button className="play-button pulse-effect">
            <span className="play-icon text-dark">▶</span>
          </button>
        </div>
      </Link>

      <div className="video-desc">
        <h2>Models:</h2>
        {Array.isArray(videoData.name) && videoData.name.length > 0 ? (
          videoData.name.map((name, index) => (
            <Link
              style={{ backgroundColor: "black" }}
              to={`/pornstar/${name}`}
              key={index}
            >
              <span
                style={{
                  cursor: "pointer",
                  color: "#007bff",
                  textDecoration: "underline",
                }}
              >
                {name.replace(/-/g, " ")}
                {index < videoData.name.length - 1 && ", "}
              </span>
            </Link>
          ))
        ) : (
          <p>{videoData.name}</p>
        )}

        <p>
          {isFullDescVisible
            ? videoData.desc
            : `${videoData.desc?.slice(0, 210)}...`}
        </p>
        {videoData.desc && videoData.desc.length > 150 && (
          <button
            style={{ fontSize: "1em" }}
            onClick={toggleDescription}
            className="view-more-btn"
          >
            {isFullDescVisible ? "Less^^" : "More>>"}
          </button>
        )}
      </div>

      <div className="related-posts">
        <div
          style={{ width: "100%" }}
          className="row row-cols-2 row-cols-md-4 g-4 mt-0 m-auto"
        >
          {postdata.map((item) => (
            <div className="col" key={item._id}>
              <Link to={`/playVideo/${item._id}`}>
                <div className="card">
                  <img
                    src={item.imageUrl}
                    className="card-img-top position-relative"
                    alt={item.altKeywords || item.titel}
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
                  <h5 className="text-light mt-2">
                    {item.titel.length > 20
                      ? `${item.titel.slice(0, 20)}...`
                      : item.titel}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {postdata.length < totalRecords && !isLoading && (
          <div className="text-center mt-4">
            <button onClick={loadMorePosts} className="load-more-btn">
              Load More...
            </button>
          </div>
        )}

        {isLoading && <div className="text-center">Loading...</div>}
      </div>

      <Footer />
    </>
  );
};

export default Video;
