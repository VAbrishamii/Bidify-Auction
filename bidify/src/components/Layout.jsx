import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();
    const noNavbar = ["/login", "/register"].includes(location.pathname);

    return (
        <div>
            {!noNavbar && <Navbar />}
            <main>{children}</main>
        </div>
    );
};
export default Layout;