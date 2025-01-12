import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onSearch, postdata }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [hideStaticSuggestions, setHideStaticSuggestions] = useState(false);

  const location = useLocation();
  const searchBarRef = useRef(null);

  const staticSearchTerms = ["indian", "sister", "MILF", "Family", "mom", "japanese"];

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSuggestions(query);
    onSearch(query);
  };

  const filterSuggestions = (query) => {
    if (!query) {
      setFilteredSuggestions([]);
      return;
    }
    const filtered = (postdata || [])
      .filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 15);
    setFilteredSuggestions(filtered);
  };

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
    setSearchQuery("");
    setFilteredSuggestions([]);
    setHideStaticSuggestions(false);
  };

  const handleCancelSearch = () => {
    setSearchQuery("");
    setShowSearchBar(false);
    setFilteredSuggestions([]);
    setHideStaticSuggestions(false);
    onSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchQuery);
    }
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarVisible(scrollTop < lastScrollTop || scrollTop < 100);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar bg-body-tertiary ${isNavbarVisible ? "" : "hidden"}`}>
        <div className="container-fluid">
          {!showSearchBar ? (
            <span className="navbar-brand">
              <Link className="bg-transparent" to="/">
                <section>
                  <div className="content">
                    <img src="/xartx.png" alt="" />
                  </div>
                </section>
              </Link>
               <section className="d-flex">
              <i onClick={toggleSearchBar} className="bi bi-search hidesearchIcon me-5"></i>
              <i onClick={() => setIsOpen(!isOpen)} className="bi bi-list"></i>
              </section>
            </span>
          ) : (
            <form className="d-flex mt-2 w-100" role="search" ref={searchBarRef}>
              <div className="searchBar w-100">
                <input
                  style={{ color: "#ffff", width: "100%" }}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  id="searchQueryInput"
                  type="text"
                  name="searchQueryInput"
                  placeholder="Search..."
                />
                <button
                  id="searchQuerySubmit"
                  type="button"
                  name="searchQuerySubmit"
                  onClick={handleCancelSearch}
                >
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path
                      fill="#ffff"
                      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="breadcrumbs-container">{/* Add breadcrumb logic here */}</div>

      <div className={`side-navbar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          <section style={{ background: "#111" }}>
          <div style={{background:"#111"}} className="content">
                    <img style={{background:"#111",width:"70px",marginRight:"80px"}} src="/xartx.png" alt="" />
                  </div>
          </section>
          <i className="bi bi-x-circle-fill"></i>
        </button>

        <ul className="responsive-navbar nav-list-bg">
          <li>
            <Link to="/"><i className="bi bi-house"></i> Home</Link>
          </li>
          <li >
            <Link to="/stars"><i className="bi bi-star"></i> Stars</Link>
          </li>
          <li ><Link  to="/indian"><i className="bi bi-emoji-kiss"></i> Indian</Link></li>
          <li ><Link to="/movies"><i className="bi bi-emoji-kiss"></i>Movies</Link></li>
          <li ><Link to="/hijabi"><i className="bi bi-heart-pulse"></i> Hijabi</Link></li>
          <li ><Link to="/newVideos"><i className="bi bi-clock"></i> New videos</Link></li>
          <li ><Link to="/popularVideos"><i className="bi bi-fire"></i> Popular videos</Link></li>
          <li ><Link to="/toprated"><i className="bi bi-heart"></i> Top rated videos</Link></li>
          <li><Link to="https://www.instagram.com/direct_hd_link/profilecard/?igsh=eDJtaWEyNmF6OTJy">
            <i className="bi bi-hand-thumbs-up-fill"></i> Follow Us
          </Link></li>
        </ul>
      </div>
    </>
  );
}

