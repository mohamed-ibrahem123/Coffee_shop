import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { totalCartCount } = useCart();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="caffinity-navbar-wrapper">
      <nav className="caffinity-navbar">
        {/* Brand Logo (inline SVG) */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="logo-icon-wrapper" aria-hidden>
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
              <rect width="48" height="48" rx="10" fill="#2b1c12" />
              <path d="M24 12c-4 0-7 3-7 7 0 5 7 12 7 12s7-7 7-12c0-4-3-7-7-7z" fill="#f0c896" />
            </svg>
          </div>
          <span className="brand-name">Coffee shop</span>
        </Link>

        {/* Navigation */}
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
        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <button className="action-btn" aria-label="Search">
            <Search className="action-icon" size={18} />
          </button>

          <Link to="/wishlist" className={`action-btn ${isActive('/wishlist') ? 'active' : ''}`} aria-label="Wishlist">
            <Heart className="action-icon" size={18} />
          </Link>

          <Link to="/cart" className={`action-btn cart-btn ${isActive('/cart') ? 'active' : ''}`} aria-label="Shopping Cart">
            <ShoppingBag className="action-icon" size={18} />
            <span className="cart-badge">{totalCartCount}</span>
          </Link>

          <Link to="/login" className={`action-btn ${isActive('/login') ? 'active' : ''}`} aria-label="User Profile">
            <User className="action-icon" size={18} />
          </Link>
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
