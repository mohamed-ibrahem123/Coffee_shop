import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { totalCartCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="caffinity-navbar-wrapper">
      <nav className="caffinity-navbar">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="logo-icon-wrapper">
            <img src={logo} alt="Coffee shop logo" className="logo-img" />
          </div>
          <span className="brand-name">Coffee shop</span>
        </Link>

        {/* Collapsible Menu Wrapper (Desktop: inline links & actions, Mobile: dropdown) */}
        <div className={`navbar-menu-wrapper ${isMenuOpen ? 'open' : ''}`}>
          {/* Navigation Links */}
          <div className="navbar-links">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Shop
            </Link>
            <a href="#about" className="nav-link" onClick={closeMenu}>
              About
            </a>

            <a href="#contact" className="nav-link" onClick={closeMenu}>
              Contact
            </a>
          </div>

        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <button className="action-btn" aria-label="Wishlist">
            <Heart className="action-icon" size={20} />
          </button>
          <button
            className="action-btn cart-btn"
            aria-label="Shopping Cart"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag className="action-icon" size={20} />
            <span className="cart-badge">{totalCartCount}</span>
          </button>
          <button className="action-btn" aria-label="User Profile">
            <User className="action-icon" size={20} />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className={`mobile-toggle-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
