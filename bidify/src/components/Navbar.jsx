import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Search from "./Search";
import { MdHome, MdLightMode, MdDarkMode , MdPerson} from "react-icons/md";


const Navbar = () => {
  const {setActiveTag, setCurrentPage} = useAppContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState({}); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('token', token);
    const user = JSON.parse(localStorage.getItem("loginuser"));

    setIsLoggedIn(!!token); 
    if (token && user) {
      setUserData(user);
    }

    const saveMode = localStorage.getItem("theme");
    if (saveMode === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup
    };
  }, []);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";

  
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
    setIsDropdownOpen(false);
  };

  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  //   document.body.classList.toggle("dark");

  //   const newMode = isDarkMode ? "dark" : "light";
  //   localStorage.setItem("theme", newMode);
    
  // };
  
  const toggleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", newMode === "dark");
    localStorage.setItem("theme", newMode);
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
    <MdPerson className="icon" />
   
  );

  const handleLinkClick = () => {
    setIsDropdownOpen(false); 
  };

  const handleHomeClick = () => {
      setActiveTag(null); 
      setCurrentPage(1);
      navigate("/");  
    
  };

  return (
    <nav className="flex-styled justify-between dark:bg-transparent px-6">
      {/* Logo */}
      <div className="flex-styled">
        <Link to="/">
          <img src="/bidify ..png" alt="App Logo" className="w-200 h-20" />
        </Link>
      </div>

      {/* Search Bar */}
      <Search />

      {/* Icons */}
      <div className="flex-styled">
        <Link to="/" onClick={handleHomeClick} className="hover:text-blue-500">
        <MdHome className="icon" />
        </Link>
        <button
          onClick={toggleTheme}
          className="focus:outline-none"
        >
        {isDarkMode ? (
            <MdLightMode className="icon"/>
          ) : (
            <MdDarkMode className="icon" />
          )}
        </button>

        {/* User Icon */}
        <div onClick={handleDropdownClick} className="relative" ref={dropdownRef}>
          {displayAvatar}

          {/* Dropdown Menu */}
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
              <ul>
                <li>
                  <Link
                  to={`/profile/${userData.name}`}
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/edit/${userData.name}`}
                    onClick={handleLinkClick}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                  >
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    to="/createlist"
                    onClick={handleLinkClick}
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
