import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("loginuser"));

    setIsLoggedIn(!!token); 
    if (token && user) {
      setUserData(user);
    }
  }, []);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const handleDropdownClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      navigate("/register");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginuser");
    setIsLoggedIn(false); 
    setUserData({});
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  const displayAvatar = isLoggedIn ? (
    userData?.avatar?.url && userData.avatar.url !== defaultAvatar ? (
      <img
        src={userData.avatar.url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
    ) : (
      <span className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center">
        {userData?.name ? userData.name[0].toUpperCase() : "U"}
      </span>
    )
  ) : (
    <i className="fas fa-user text-lg"></i> 
  );

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

        {/* User Icon */}
        <div onClick={handleDropdownClick} className="relative">
          {displayAvatar}

          {/* Dropdown Menu */}
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/edit"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    to="/createlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Create Listing
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
