import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark fs-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              {/* Dropdown toggle uses a normal <a> since NavLink doesn't support dropdowns easily */}
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Service
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink 
                    to="/service/action" 
                    className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}
                  >
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/service/another-action" 
                    className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}
                  >
                    Another action
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/service/something-else" 
                    className={({ isActive }) => "dropdown-item" + (isActive ? " active" : "")}
                  >
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Contact us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/login" 
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/registration" 
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Registration
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
