import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    _id,
    name,
    description,
    price,
    currency = 'USD',
    ratingsAverage = 0,
    ratingsQuantity = 0,
    category = 'Hot Drinks',
    image,
    isAvailable = true,
  } = product;

  const formattedPrice = `${currency || 'USD'} ${Number(price || 0).toFixed(2)}`;

  const handleCardClick = () => {
    if (_id) {
      navigate(`/products/${_id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic or notification
  };

  // Badge category style logic
  const isCold = category?.toLowerCase().includes('cold');
  const badgeClass = isCold ? 'badge-cold' : 'badge-hot';

  // Fallback image if image URL is invalid or empty
  const defaultImage = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="product-card fade-in" onClick={handleCardClick}>
      {/* Card Header & Image Container */}
      <div className="card-image-container">
        <span className={`category-badge ${badgeClass}`}>{category}</span>
        {!isAvailable && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
        <img
          src={image || defaultImage}
          alt={name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>

        {/* Rating Row */}
        <div className="rating-row">
          <span className="rating-number">{ratingsAverage ? Number(ratingsAverage).toFixed(1) : '4.8'}</span>
          <Star className="star-icon" size={14} fill="#EAB308" color="#EAB308" />
          <span className="reviews-count">({ratingsQuantity || 120})</span>
        </div>

        {/* Price Row */}
        <div className="price-text">{formattedPrice}</div>

        {/* Action Button Row */}
        <div className="card-action-row">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <span>Add to Cart</span>
          </button>
          <button className="cart-icon-btn" onClick={handleAddToCart} aria-label="Add to cart icon">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
