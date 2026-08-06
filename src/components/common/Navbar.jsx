import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/products' || path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/products');
    }
    return location.pathname === path;
  };

  return (
    <header className="caffinity-navbar-wrapper">
      <nav className="caffinity-navbar">
        {/* Brand Logo */}
        <Link to="/products" className="navbar-brand">
          <div className="logo-icon-wrapper">
            <span className="logo-icon-inner">☕</span>
          </div>
          <span className="brand-name">Coffee shop</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <button className="action-btn" aria-label="Search">
            <Search className="action-icon" size={20} />
          </button>
          <Link to="/wishlist" className={`action-btn ${isActive('/wishlist') ? 'active' : ''}`} aria-label="Wishlist">
            <Heart className="action-icon" size={20} />
          </Link>
          <Link to="/cart" className={`action-btn cart-btn ${isActive('/cart') ? 'active' : ''}`} aria-label="Shopping Cart">
            <ShoppingBag className="action-icon" size={20} />
            <span className="cart-badge">0</span>
          </Link>
          <Link to="/login" className={`action-btn ${isActive('/login') ? 'active' : ''}`} aria-label="User Profile">
            <User className="action-icon" size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;