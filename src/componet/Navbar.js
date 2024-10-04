import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch, postdata }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false); // State for search bar visibility
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [hideStaticSuggestions, setHideStaticSuggestions] = useState(false); // Hide static suggestions when needed

  const searchBarRef = useRef(null);
  const searchDebounceTimeout = useRef(null);

  const staticSearchTerms = ["indian", "sister", "MILF", "Family","mom","japanese"];

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHideStaticSuggestions(true); // Hide static suggestions when typing

    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }

    searchDebounceTimeout.current = setTimeout(() => {
      filterSuggestions(query);
    }, 300);
  };

  // Filter suggestions based on the input
  const filterSuggestions = (query) => {
    if (!query) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = postdata
      .filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 15);

    setFilteredSuggestions(filtered);
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev); // Toggle the search bar visibility
    setSearchQuery(""); // Clear search input on toggle
    setFilteredSuggestions([]); // Clear suggestions on toggle
    setHideStaticSuggestions(false); // Show static suggestions when search bar is toggled open
  };

  // Handle suggestion click
  const handleSuggestionClick = (term) => {
    setSearchQuery(term);
    setFilteredSuggestions([]); // Clear filtered suggestions after clicking
    setHideStaticSuggestions(true); // Hide static suggestions after clicking
    onSearch(term); // Trigger search
  };

  // Cancel search action
  const handleCancelSearch = () => {
    setSearchQuery("");
    onSearch("");
    setFilteredSuggestions([]);
    setHideStaticSuggestions(false); // Show static suggestions when search is cleared
  };

  // Handle navbar scroll visibility
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
          <span className="navbar-brand">
            <i onClick={() => setIsOpen(!isOpen)} className="bi bi-list"></i>
            <Link to="/">
              <img src="hexmy.png" alt="Maje logo" />
            </Link>
            <i onClick={toggleSearchBar} className="bi bi-search"></i> {/* Toggling Search Bar */}
          </span>

          {showSearchBar && (
            <form className="d-flex mt-2 position-relative" role="search" ref={searchBarRef}>
              <div className="searchBar">
                <input
                  style={{ color: "#fff" }}
                  value={searchQuery}
                  onChange={handleInputChange}
                  id="searchQueryInput"
                  type="text"
                  name="searchQueryInput"
                  placeholder="Search videos..."
                />
                <button
                  id="searchQuerySubmit"
                  type="button"
                  name="searchQuerySubmit"
                  onClick={handleCancelSearch}
                >
                  {searchQuery ? (
                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                      <path
                        fill="#666666"
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                      />
                    </svg>
                  ) : (
                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                      <path d="" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Show Static Suggestions if there are no dynamic suggestions */}
              {!hideStaticSuggestions && (
                <div className="suggestions-box">
                  <ul>
                    
                     <span className="group-title">Popular searches</span>
                    {staticSearchTerms.map((term) => (
                      <li key={term} onClick={() => handleSuggestionClick(term)}>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Show Dynamic Suggestions */}
              {filteredSuggestions.length > 0 && (
                <div className="suggestions-box">
                  <ul>
                    {filteredSuggestions.map((item) => (
                      <li key={item._id} onClick={() => handleSuggestionClick(item.name)}>
                        {item.name} - {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          )}
        </div>
      </nav>

      <div className={`side-navbar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          <img className="sidenav-logo" src="hexmy.png" alt="" />
          <i className="bi bi-x-circle-fill"></i>
        </button>

        <ul className="responsive-nabar">
          <li>
            <Link to="/">
              <i className="bi bi-house"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/stars">
              <i className="bi bi-star"></i> Stars
            </Link>
          </li>
          <li>
            <Link to="/indian">
              <i className="bi bi-emoji-kiss"></i> Indians
            </Link>
          </li>
          <li>
            <Link to="/hijabi">
              <i className="bi bi-heart-pulse"></i> Hijabi
            </Link>
          </li>
          <li>
            <Link to="/popularVideos">
              <i className="bi bi-fire"></i> Popular videos
            </Link>
          </li>
          <li>
            <Link to="/newVideos">
              <i className="bi bi-clock"></i> New videos
            </Link>
          </li>
          <li>
            <Link to="/toprated">
              <i className="bi bi-heart"></i> Top rated videos
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/direct_hd_link/?utm_source=qr&igsh=eDJtaWEyNmF6OTJy">
              <i className="bi bi-hand-thumbs-up-fill"></i> Follow Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
