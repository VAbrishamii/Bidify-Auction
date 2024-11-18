import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    }
    return (
      <nav className="px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src="/bidify .png" alt="App Logo" className="w-50 h-20" />
        </Link>
       
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search listings..."
          className="px-4 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-blue-500">
          <i className="fas fa-home text-lg"></i>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="hover:text-blue-500 focus:outline-none"
        >
          <i className="fas fa-moon text-lg"></i>
        </button>
        <Link to="/profile" className="hover:text-blue-500">
          <i className="fas fa-user text-lg"></i>
        </Link>
      </div>
    </nav>
        
    );
};
export default Navbar;