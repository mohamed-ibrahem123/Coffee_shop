import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Coffee } from 'lucide-react';
import notFoundImg from '../assets/not_found_coffee.jpg';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <div className="notfound-content-card">
        {/* Left Side: Generated 404 Coffee Image */}
        <div className="notfound-image-wrapper">
          <img
            src={notFoundImg}
            alt="Coffee cup 404 page not found"
            className="notfound-image"
          />
        </div>

        {/* Right Side: Text & Actions */}
        <div className="notfound-text-section">
          <div className="notfound-badge">
            <Coffee size={14} />
            <span>404 Error</span>
          </div>
          
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-title">Oops! Page Not Found</h2>
          
          <p className="notfound-description">
            The page you are looking for might have been moved, renamed, or doesn't exist. Let's get you back to your favorite cup of coffee!
          </p>

          <div className="notfound-actions">
            <Link to="/" className="notfound-btn-primary">
              <Home size={18} />
              <span>Back to Home</span>
            </Link>

            <Link to="/products" className="notfound-btn-secondary">
              <ShoppingBag size={18} />
              <span>Explore Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}