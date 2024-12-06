import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Search from "./Search";
import { MdHome, MdLightMode, MdDarkMode, MdPerson } from "react-icons/md";

const Navbar = () => {
  const { setActiveTag, setCurrentPage, userData, updateUserData } =
    useAppContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";

  // const lightLogo = "/Bidify ..png";


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
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
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
    updateUserData({});
    setIsDropdownOpen(false);
  };

  const toggleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", newMode === "dark");
    localStorage.setItem("theme", newMode);
  };

  const handleHomeClick = () => {
    setActiveTag(null);
    setCurrentPage(1);
    navigate("/");
  };

  const displayAvatar = isLoggedIn ? (
    userData?.avatar?.url && userData.avatar.url !== defaultAvatar ? (
      <img src={userData.avatar.url} alt="User Avatar" className="islogin" />
    ) : (
      <span className="no-user-avatar">
        {userData?.name ? userData.name[0].toUpperCase() : "U"}
      </span>
    )
  ) : (
    <MdPerson className="icon mt-2" />
  );

  return (
    <div>
      <nav className="flex-styled navbar sm:flex-row ">
        {/* Logo */}
        <div className="flex-styled">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/Bidify ..png`} alt="App Logo" className="logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block">
          <Search />
        </div>

        {/* Icons */}
        <div className="flex-styled">
          <Link to="/" onClick={handleHomeClick}>
            <MdHome className="icon" />
          </Link>
          <button aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
            {isDarkMode ? (
              <MdLightMode className="icon" />
            ) : (
              <MdDarkMode className="icon" />
            )}
          </button>

          {/* User Icon */}
          <div
            onClick={handleDropdownClick}
            className="relative avatar"
            ref={dropdownRef}>
            {displayAvatar}

            {/* Dropdown Menu */}
            {isLoggedIn && isDropdownOpen && (
              <div className="dropdown">
                <ul>
                  <li>
                    <Link
                      to={`/profile/${userData.name}`}
                      className="menu-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={`/edit/${userData.name}`} className="menu-item">
                      Edit
                    </Link>
                  </li>
                  <li>
                    <Link to="/createlist" className="menu-item">
                      Create Listing
                    </Link>
                  </li>
                  <li>
                    <button aria-lable='LogOut' onClick={handleLogout} className="menu-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Search Bar Outside Navbar (Small Screens) */}
      <div className="sm:hidden p-4">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
