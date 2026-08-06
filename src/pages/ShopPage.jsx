import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import SidebarFilters from '../components/products/SidebarFilters';
import SkeletonCard from '../components/common/SkeletonCard';
import ErrorMessage from '../components/common/ErrorMessage';
import './ShopPage.css';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt,price,-ratingsAverage");
  const [priceMax, setPriceMax] = useState(20);
  const [selectedDrinkTypes, setSelectedDrinkTypes] = useState([]);

  const handleSelectCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat }, { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("category");
      setSearchParams(newParams);
    }
  };

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const data = await getProducts(sortBy, params);
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Unable to fetch products from server.");
    } finally {
      setLoading(false);
    }
  }, [sortBy, selectedCategory]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setActiveSearch(searchTerm);
  };

  const handleToggleDrinkType = (type) => {
    setSelectedDrinkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Filter products based on active search, price, and drink types (category is handled directly by the API parameter)
  const filteredProducts = products.filter((item) => {
    // Search filter
    if (activeSearch) {
      const matchName = item.name
        ?.toLowerCase()
        .includes(activeSearch.toLowerCase());
      const matchDesc = item.description
        ?.toLowerCase()
        .includes(activeSearch.toLowerCase());
      if (!matchName && !matchDesc) return false;
    }

    // Price filter
    if (item.price > priceMax) {
      return false;
    }

    // Drink types filter
    if (selectedDrinkTypes.length > 0) {
      const itemCat = item.category || "";
      const matchesDrinkType = selectedDrinkTypes.some((dt) =>
        itemCat.toLowerCase().includes(dt.toLowerCase().replace(" drinks", "")),
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
          <label htmlFor="sort-select" className="sort-label">
            Sort By:
          </label>
          <div className="sort-select-wrapper">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="-createdAt,price,-ratingsAverage">
                Popularity
              </option>
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
            onSelectCategory={handleSelectCategory}
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
                  setSearchTerm("");
                  setActiveSearch("");
                  handleSelectCategory("");
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
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
