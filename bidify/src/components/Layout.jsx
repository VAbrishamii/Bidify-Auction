import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!noNavbar && <Navbar />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
