import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>SteamClone</h2>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Store
          </Link>
          <Link to="/library" className="navbar-item">
            Library
          </Link>
          <Link to="/community" className="navbar-item">
            Community
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;