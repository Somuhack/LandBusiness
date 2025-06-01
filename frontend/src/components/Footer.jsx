import React from 'react';
import { FaGithub, FaPhoneAlt, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-light pt-5 pb-4 shadow-lg">
      <div className="container">
        <div className="row">
          {/* Brand Name */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h4 className="fw-bold mb-3">OurBrand</h4>
            <p>Your trusted brand for modern web solutions.</p>
          </div>

          {/* Page Links - Column Layout */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-semibold mb-3">Pages</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#home" className="text-light text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-light text-decoration-none">About</a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-light text-decoration-none">Services</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-light text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social & Contact Icons */}
          <div className="col-md-4 mb-4 text-center text-md-end">
            <h5 className="fw-semibold mb-3">Connect with Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="tel:+1234567890" className="text-light fs-5" title="Call">
                <FaPhoneAlt />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5" title="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5" title="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <hr className="border-light" />
        <div className="text-center text-light small">
          © {new Date().getFullYear()} OurBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
