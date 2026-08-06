import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import logoImg from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { totalCartCount } = useCart();
  const { wishlist } = useWishlist();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          <Link to="/wishlist" className={`action-btn ${isActive('/wishlist') ? 'active' : ''}`} aria-label="Wishlist" style={{ position: 'relative' }}>
            <Heart className="action-icon" size={18} />
            {wishlist && wishlist.length > 0 && (
              <span className="cart-badge" style={{ backgroundColor: '#ef4444' }}>
                {wishlist.length}
              </span>
            )}
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