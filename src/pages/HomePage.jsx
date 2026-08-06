import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/products/ProductCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

// Products data
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories slider
  const [categoryStart, setCategoryStart] = useState(0);


  // Fetch products from API when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories from products
  const categories = [
    ...new Set(products.map((product) => product.category))
  ].map((category, index) => ({
    id: index + 1,
    name: category,
    image: products.find(
      (product) => product.category === category
    )?.image
  }));


  // Display only 4 categories at a time
  const visibleCategories = categories.slice(
    categoryStart,
    categoryStart + 4
  );


  // Move to the next group of categories
  const handleNextCategories = () => {
    if (categoryStart + 4 < categories.length) {
      setCategoryStart(categoryStart + 4);
    } else {
      setCategoryStart(0);
    }
  };

  // Navigation
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience Premium Beverages
          </h1>
          <p className="hero-subtitle">
            Savor the world's finest coffees and teas, delivered to your doorstep.
          </p>
          <button
            className="hero-btn"
            type="button"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container">
        <h2 className="section-title">
          Featured Categories
        </h2>

        <div className="categories-wrapper">
          <div className="categories-grid">
            {visibleCategories.map((category) => (

              <div
                key={category.id}
                className="category-card"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-overlay">

                  <h3 className="category-name">
                    {category.name}
                  </h3>
                </div>
              </div>

            ))}
          </div>

          <button
            className="categories-nav-btn"
            type="button"
            onClick={handleNextCategories}
          >
            ›
          </button>
        </div>

        <div className="categories-pagination">
          <span
            className={`pagination-bar ${
              categoryStart === 0 ? "active" : ""
            }`}
            onClick={() => setCategoryStart(0)}></span>

          <span
            className={`pagination-bar ${
              categoryStart !== 0 ? "active" : ""
            }`}
            onClick={() => setCategoryStart(4)}></span>
        </div>
      </section>

      {/* Products */}
      <section className="section-container">
        <h2 className="section-title">
          Popular Products
        </h2>

        <div className="drinks-grid">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!loading &&
            products.slice(0, 4).map((product) => (

              <ProductCard
                key={product._id || product.id}
                product={product}
              />

            ))}
        </div>
      </section>

      {/* Offers */}
      <section className="section-container offers-section">
        <h2 className="section-title">
          Today's Offers
        </h2>
        <div className="offer-banner-wrapper">
          <div className="offer-decorative-line"></div>
          <div className="offer-banner">
            <div className="offer-left">
              <h3 className="offer-title">
                20% OFF Cold Brews Today!
              </h3>
              <p className="offer-code">
                Promo Code: CODED123
              </p>
              <button
                className="offer-btn"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
            </div>
            <div className="offer-right">
              <img
                src={products[0]?.image}
                alt="Offer"
                className="offer-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
