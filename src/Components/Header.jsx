import React from "react";
import "../StyleSheets/Header.css";
import collegeLogo from "../Images/collegeLogo.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <img src={collegeLogo} alt="College Logo" className="brand-logo" />

          <div className="brand-text">
            <div className="brand-title">ALAGAPPA CHETTIAR GOVERNMENT COLLEGE</div>
            <div className="brand-subtitle">OF ENGINEERING AND TECHNOLOGY</div>
            <span className="brand-tagline">Department of Training & Placement</span>
          </div>
        </div>

      
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/companies">Companies</a>
          
          <a href="/contact">Contact</a>
        </nav>

        <button className="btn-login" onClick={()=> navigate("/login") }>
          Login
        </button>

      </div>
    </header>
  );
};

export default Header;