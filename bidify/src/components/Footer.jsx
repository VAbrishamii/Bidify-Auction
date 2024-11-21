import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-slate-400">
      <div className="contact-us">
        <h2>Contact Us:</h2>
        <p>Email: <a href="mailto:contact@example.com">contact@example.com</a></p>
        <p>Tell: <a href="987654321">10000000</a></p>
      </div>

      <div className="social-media">
        <h3>Follow Us:</h3>
        <div className="icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
