import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isloggedIn = Boolean(localStorage.getItem("token"));
  console.log('isloggedIn', isloggedIn);
  const userData = JSON.parse(localStorage.getItem("loginuser")) || {};
  console.log('userData', userData);
  const avatar = userData?.avatar.url;
  const username = userData?.name;

  const defaultAvatar = "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"

  const handleUserIconClick = () => {
    if (isloggedIn) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  const displayAvatar = avatar && avatar !==  defaultAvatar ? (
  <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
  ) : (
    <span className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center">
      {username ? username[0].toUpperCase() : "U"}
    </span>
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
          className="hover:text-blue-500 focus:outline-none">
          <i className="fas fa-moon text-lg"></i>
        </button>
        {/* User Icon */}
        <button onClick={handleUserIconClick}>
        {isloggedIn ? displayAvatar : <i className="fas fa-user text-lg"></i>}
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
