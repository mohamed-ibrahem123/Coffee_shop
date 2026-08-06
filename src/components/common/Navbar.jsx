import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();

  const { totalCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    closeMenu();
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="caffinity-navbar-wrapper">
      <nav className="caffinity-navbar">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src={logoImg} alt="Coffee shop Logo" className="logo-img" />
          <span className="brand-name">Coffee shop</span>
        </Link>

        {/* Collapsible Menu Wrapper (Desktop: inline links, Mobile: dropdown) */}
        <div className={`navbar-menu-wrapper ${isMenuOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </Link>

            <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} onClick={closeMenu}>
              Shop
            </Link>

            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
              About
            </Link>

            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={closeMenu}>
              Blog
            </Link>

            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>
              Contact
            </Link>
          </div>

          {/* Action Icons & Auth Section */}
          <div className="navbar-actions">
            {/* 1. Action Icons (Wishlist & Cart) */}
            <div className="navbar-icons-group">
              <Link to="/wishlist" className={`action-btn ${isActive('/wishlist') ? 'active' : ''}`} aria-label="Wishlist" onClick={closeMenu} style={{ position: 'relative' }}>
                <Heart className="action-icon" size={18} />
                {wishlist && wishlist.length > 0 && (
                  <span className="cart-badge">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className={`action-btn cart-btn ${isActive('/cart') ? 'active' : ''}`} aria-label="Shopping Cart" onClick={closeMenu}>
                <ShoppingBag className="action-icon" size={18} />
                <span className="cart-badge">{totalCartCount}</span>
              </Link>
            </div>

            {/* 2. Authentication Section (Login Button or User Icon) */}
            <div className="navbar-auth-group">
              {isLoggedIn ? (
                <div className="user-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    className="action-btn user-icon-btn"
                    onClick={toggleDropdown}
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <User className="action-icon" size={18} />
                  </button>

                  {isDropdownOpen && (
                    <div className="user-dropdown-menu single-option">
                      <button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="dropdown-item-icon" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`navbar-login-btn ${isActive('/login') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`mobile-toggle-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;