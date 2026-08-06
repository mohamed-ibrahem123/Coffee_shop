import { useState, useEffect,useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProductById, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import SkeletonDetails from '../components/common/SkeletonDetails';
import ErrorMessage from '../components/common/ErrorMessage';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selection states
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedSugar, setSelectedSugar] = useState('Low');
  const [activeImage, setActiveImage] = useState('');

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch product by ID
      const data = await getProductById(id);
      setProduct(data);
      if (data?.image) {
        setActiveImage(data.image);
      }

      // Fetch related products for bottom section
      try {
        const allProds = await getProducts();
        const filtered = (allProds || [])
          .filter((p) => p._id !== id && p.id !== id)
          .slice(0, 3);
        setRelatedProducts(filtered);
      } catch (relErr) {
        console.warn('Could not load related products:', relErr);
      }
    } catch (err) {
      console.error(`Error loading product details for ID ${id}:`, err);
      setError(`Failed to load product details from server for ID ${id}. Please ensure backend server is running.`);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchDetails();
      window.scrollTo(0, 0);
    }
  }, [id,fetchDetails]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="product-details-page fade-in">
        {/* Top Header Banner */}
        <div className="details-hero-banner">
          <h1 className="details-banner-title">Product Details</h1>
        </div>
        <div className="details-main-content">
          <SkeletonDetails />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page fade-in">
        <div className="details-hero-banner">
          <h1 className="details-banner-title">Product Details</h1>
        </div>
        <div className="details-main-content">
          <ErrorMessage
            message={error || "Product not found."}
            onRetry={fetchDetails}
          />
          <div
            style={{
              textTransform: "center",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Link to="/products" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const defaultImg =
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80";
  const displayImage = activeImage || product.image || defaultImg;

  // Alternate images array for thumbnail gallery
  const thumbnails = [
    displayImage,
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
  ];

  const formattedPrice = `${product.currency || "USD"} ${Number(product.price || 0).toFixed(2)}`;

  return (
    <div className="product-details-page fade-in">
      {/* Top Banner Header */}
      <div className="details-hero-banner">
        <div className="banner-overlay" />
        <h1 className="details-banner-title">Product Details</h1>
      </div>

      <div className="details-main-content">
        {/* Back Link */}
        <button onClick={() => navigate("/products")} className="back-link-btn">
          <ArrowLeft size={16} />
          <span>Back to Shop</span>
        </button>

        {/* Main Product Showcase Section */}
        <div className="product-showcase-grid">
          {/* Left Column: Image Gallery */}
          <div className="showcase-gallery">
            <div className="main-image-wrapper">
              <img
                src={displayImage}
                alt={product.name}
                className="main-product-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
              />
            </div>
            {/* Thumbnail Row */}
            <div className="thumbnails-row">
              {thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  className={`thumbnail-item ${displayImage === thumb ? "active" : ""}`}
                  onClick={() => setActiveImage(thumb)}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Selection */}
          <div className="showcase-info">
            <h2 className="detail-product-title">{product.name}</h2>
            <div className="detail-price">{formattedPrice}</div>

            {/* Rating */}
            <div className="detail-rating-row">
              <Star size={16} fill="#EAB308" color="#EAB308" />
              <span className="rating-val">
                {product.ratingsAverage
                  ? Number(product.ratingsAverage).toFixed(1)
                  : "4.5"}
              </span>
              <Star size={16} fill="#EAB308" color="#EAB308" />
              <span className="reviews-val">
                ({product.ratingsQuantity || 128} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="detail-description">{product.description}</p>

            {/* Options 1: Drink Size */}
            <div className="option-group">
              <label className="option-label">Drink Size:</label>
              <div className="pill-options">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    className={`pill-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Options 2: Sugar Level */}
            <div className="option-group">
              <label className="option-label">Sugar Level:</label>
              <div className="pill-options">
                {["None", "Low", "Medium", "High"].map((sugar) => (
                  <button
                    key={sugar}
                    className={`pill-btn ${selectedSugar === sugar ? "active" : ""}`}
                    onClick={() => setSelectedSugar(sugar)}
                  >
                    {sugar}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="details-actions-row">
              <button className="add-cart-outlined-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="buy-now-filled-btn" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="details-section-divider" />

        {/* Ingredients & Nutrition Facts Section */}
        <div className="info-tables-grid">
          {/* Ingredients */}
          <div className="info-column">
            <h3 className="info-heading">INGREDIENTS</h3>
            <ul className="ingredients-list">
              <li>Espresso</li>
              <li>Steamed Milk</li>
              <li>Microfoam</li>
            </ul>
          </div>

          {/* Nutrition Facts */}
          <div className="info-column">
            <h3 className="info-heading">NUTRITION FACTS (PER SERVING)</h3>
            <div className="nutrition-table-container">
              <div className="nutrition-row">
                <span className="nut-label">Calories</span>
                <span className="nut-val">180 kcal</span>
                <span className="nut-label">Carbs</span>
                <span className="nut-val">14g</span>
              </div>
              <div className="nutrition-row">
                <span className="nut-label">Fat</span>
                <span className="nut-val">7g</span>
                <span className="nut-label">Protein</span>
                <span className="nut-val">11g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3 className="related-heading">RELATED PRODUCTS</h3>
            <div className="related-products-grid">
              {relatedProducts.map((relItem) => (
                <div
                  key={relItem._id || relItem.id}
                  className="related-product-card"
                  onClick={() => navigate(`/products/${relItem._id}`)}
                >
                  <div className="related-img-box">
                    <img
                      src={relItem.image || defaultImg}
                      alt={relItem.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImg;
                      }}
                    />
                  </div>
                  <div className="related-card-content">
                    <h4 className="related-card-title">
                      {relItem.name?.toUpperCase()}
                    </h4>
                    <p className="related-card-desc">{relItem.description}</p>
                    <div className="related-card-footer">
                      <div className="related-rating-pill">
                        <span>{relItem.ratingsAverage || "4.5"}</span>
                        <Star size={11} fill="#EAB308" color="#EAB308" />
                      </div>
                      <span className="related-price">
                        {relItem.currency || "USD"}{" "}
                        {Number(relItem.price || 0).toFixed(2)}
                      </span>
                      <button
                        className="related-bag-btn"
                        aria-label="Add item"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relItem);
                        }}
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;