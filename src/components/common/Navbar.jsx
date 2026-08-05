import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import './Navbar.css';


const Navbar = () => {
  const location = useLocation();

const isActive = (path) => {
  return location.pathname === path;
};

  return (
    <header className="caffinity-navbar-wrapper">
      <nav className="caffinity-navbar">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-icon-wrapper">
            <span className="logo-icon-inner">☕</span>
          </div>
          <span className="brand-name">Coffee shop</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
           Home
          </Link>
          <Link to="/products"
             className={`nav-link ${isActive("/products") ? "active" : ""}`}>
            Shop
          </Link>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#blog" className="nav-link">
            Blog
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <button className="action-btn" aria-label="Search">
            <Search className="action-icon" size={20} />
          </button>
          <button className="action-btn" aria-label="Wishlist">
            <Heart className="action-icon" size={20} />
          </button>
          <button className="action-btn cart-btn" aria-label="Shopping Cart">
            <ShoppingBag className="action-icon" size={20} />
            <span className="cart-badge">0</span>
          </button>
          <button className="action-btn" aria-label="User Profile">
            <User className="action-icon" size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
