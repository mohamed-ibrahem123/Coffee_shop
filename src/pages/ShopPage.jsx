import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import SidebarFilters from '../components/products/SidebarFilters';
import SkeletonCard from '../components/common/SkeletonCard';
import ErrorMessage from '../components/common/ErrorMessage';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt,price,-ratingsAverage');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceMax, setPriceMax] = useState(20);
  const [selectedDrinkTypes, setSelectedDrinkTypes] = useState([]);

  const fetchProductsData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint specified: GET http://localhost:3000/api/v1/products?sort=-createdAt,price,-ratingsAverage
      const data = await getProducts(sortBy);
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Unable to fetch products from server. Please verify your backend server is running on http://localhost:3000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [sortBy]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setActiveSearch(searchTerm);
  };

  const handleToggleDrinkType = (type) => {
    setSelectedDrinkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filter products based on search, category, price, and drink types
  const filteredProducts = products.filter((item) => {
    // Search filter
    if (activeSearch) {
      const matchName = item.name?.toLowerCase().includes(activeSearch.toLowerCase());
      const matchDesc = item.description?.toLowerCase().includes(activeSearch.toLowerCase());
      if (!matchName && !matchDesc) return false;
    }

    
  // Category filter
  if (selectedCategory) {
    const categoryMap = {
      Espresso: ["Espresso"],
      Coffee: [
        "Americano",
        "Cappuccino",
        "Latte",
        "Mocha",
        "Flat White",
        "Cortado",
        "Turkish Coffee",
        "French Coffee",
        "Spanish Latte",
        "Iced Coffee",
        "Iced Latte",
        "Iced Mocha",
        "Iced Americano",
        "Cold Brew",
        "Frappuccino",
      ],
      Tea: [
        "Black Tea",
        "Green Tea",
        "Mint Tea",
        "Karak Tea",
        "Matcha Latte",
        "Hibiscus Tea",
        "Iced Tea",
      ],
      Specialty: [
        "Hot Chocolate",
        "Natural Energy Drink",
        "Energy Drinks",
        "Licorice Drink",
        "Carob Drink",
        "Sugarcane Juice",
        "Tamarind Drink",
        "Jallab",
        "Qamar Al-Din",
      ],
      Milkshakes: ["Milkshake"],
      Smoothies: ["Smoothie"],
      "Fresh Juices": ["Juice"],
    };

    const keywords = categoryMap[selectedCategory] || [];

    const matches = keywords.some(
      (word) =>
        item.name?.toLowerCase().includes(word.toLowerCase()) ||
        item.category?.toLowerCase().includes(word.toLowerCase())
    );

    if (!matches) return false;
  }

    // Price filter
    if (item.price > priceMax) {
      return false;
    }

    // Drink types filter
    if (selectedDrinkTypes.length > 0) {
      const itemCat = item.category || '';
      const matchesDrinkType = selectedDrinkTypes.some((dt) =>
        itemCat.toLowerCase().includes(dt.toLowerCase().replace(' drinks', ''))
      );
      if (!matchesDrinkType) return false;
    }

    return true;
  });

  return (
    <div className="shop-page-container fade-in">
      {/* Top Header & Breadcrumbs */}
      <div className="shop-header-section">
        <div className="breadcrumbs">
          <span>Home</span> / <span className="current-breadcrumb">Shop</span>
        </div>
        <h1 className="shop-title">Shop</h1>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="shop-controls-bar">
        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <Search size={18} />
          </button>
        </form>

        {/* Sort Dropdown */}
        <div className="sort-dropdown-container">
          <label htmlFor="sort-select" className="sort-label">Sort By:</label>
          <div className="sort-select-wrapper">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="-createdAt,price,-ratingsAverage">Popularity</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratingsAverage">Top Rated</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="shop-main-grid">
        {/* Left Sidebar Filters */}
        <div className="shop-sidebar-column">
          <SidebarFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceMax={priceMax}
            onChangePriceMax={setPriceMax}
            selectedDrinkTypes={selectedDrinkTypes}
            onToggleDrinkType={handleToggleDrinkType}
          />
        </div>

        {/* Right Products Content Column */}
        <div className="shop-products-column">
          {loading ? (
            <div className="products-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchProductsData} />
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <h3>No products found</h3>
              <p>Try adjusting your search query or filter options.</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setActiveSearch('');
                  setSelectedCategory('');
                  setPriceMax(20);
                  setSelectedDrinkTypes([]);
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
