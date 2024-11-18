import React from "react";
import { Link } from "react-router-dom";
// import './Navbar.css';

const Navbar = () => {
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    }
    return (
        <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="App Logo" />
          </Link>
        </div>
  
        {/* Search Bar */}
        <div className="navbar-search">
          <input type="text" placeholder="Search listings..." />
        </div>
  
        {/* Icons */}
        <div className="navbar-icons">
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
          <button onClick={toggleDarkMode}>
            <i className="fas fa-moon"></i>
          </button>
          <Link to="/profile">
            <i className="fas fa-user"></i>
          </Link>
        </div>
      </nav>
        
    );
};
export default Navbar;