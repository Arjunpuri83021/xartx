import Navbar from "./Navbar";
import React, { useState } from "react";

function Channel() {
  const [company, setCompany] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");
  const [technologies, setTechnologies] = useState([]);

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleTechnologyInputChange = (e) => {
    setTechnologyInput(e.target.value);
  };

  const handleTechnologyKeyDown = (e) => {
    if (e.key === "Enter" && technologyInput.trim() !== "") {
      setTechnologies([...technologies, technologyInput.trim()]);
      setTechnologyInput("");
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      company,
      technologies,
    };
    console.log("Form Data: ", formData);
    // Perform further actions like sending the data to a server
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Company and Technologies Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Company:
            <input
              type="text"
              value={company}
              onChange={handleCompanyChange}
              placeholder="Enter company name"
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Technologies:
            <input
              type="text"
              value={technologyInput}
              onChange={handleTechnologyInputChange}
              onKeyDown={handleTechnologyKeyDown}
              placeholder="Add a technology and press Enter"
              style={{ marginLeft: "10px" }}
            />
          </label>
          <div style={{ marginTop: "10px" }}>
            <strong>Added Technologies:</strong>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};
  
  export default Channel;
  