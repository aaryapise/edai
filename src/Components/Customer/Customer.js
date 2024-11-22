import React, { useState } from 'react';
import './Customer.css';
import Work from '../Work/Work'; // Ensure the path to Work.js is correct
import logo from '../../Assests/logo.png';
import genai from '../../Assests/genai.jpg';

function Customer() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="customer-container">
      {/* Header Section */}
      <header className="customer-header">
        <nav className="navbar">
          <img src={logo} alt="Header Logo" className="customer-logo" />
          <ul className="navbar-links">
            <li><a href="#work">Work</a></li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#services" className="dropdown-link">Services</a>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><a href="#product-engineering">Product Engineering</a></li>
                  <li><a href="#enterprise-data">Enterprise Data Services</a></li>
                  <li><a href="#digital-commerce">Digital Commerce</a></li>
                  <li><a href="#digital-operations">Digital Operations</a></li>
                  <li><a href="#digital-consulting">Digital Consulting</a></li>
                  <li><a href="#digital-experience">Digital Experience Design</a></li>
                </ul>
              )}
            </li>
            <li><a href="#insights">Insights</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#enterprise-data-services">Enterprise Data Services</a></li>
            <li><a href="#generative-ai">Generative AI</a></li>
            <li><a href="#healthcare">Healthcare</a></li>
          </ul>
          <button className="contact-btn">Contact Us</button>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="customer-main">
        {/* AI Banner Section */}
        <section className="ai-banner">
          <div className="ai-text">
            <h1>Generative AI</h1>
            <p>Building a Secure Future with LLMs and Generative AI</p>
            <button className="know-more-btn">Know More</button>
          </div>
          <div className="ai-image">
            <img src={genai} alt="Generative AI" />
          </div>
        </section>

        {/* Work Section */}
        <Work />
      </main>

      {/* Footer Section */}
      <footer className="customer-footer">
        <p>
          This website stores cookies on your computer to improve your browsing experience.
          <a href="#privacy-policy"> Privacy Policy</a>
        </p>
        <div className="footer-buttons">
          <button className="accept-btn">Accept</button>
          <button className="decline-btn">Decline</button>
        </div>
      </footer>
    </div>
  );
}

export default Customer;