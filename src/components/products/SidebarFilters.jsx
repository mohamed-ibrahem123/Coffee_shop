import './SidebarFilters.css';

const CATEGORIES = [
  'Hot Drinks',
  'Cold Drinks',
  'Energy Drinks',
  'Specialty Drinks',
  'Milkshakes',
  'Smoothies',
  'Fresh Juices',
];

const SidebarFilters = ({
  selectedCategory,
  onSelectCategory,
  priceMax,
  onChangePriceMax,
}) => {
  return (
    <aside className="sidebar-filters-card">
      <h3 className="filters-heading">Filters</h3>

      {/* Categories Section */}
      <div className="filter-section">
        <h4 className="filter-subheading">Categories</h4>
        <ul className="categories-list">
          <li
            className={`category-item ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => onSelectCategory("")}
          >
            All Categories
          </li>
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className={`category-item ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-divider" />

      {/* Price Range Section */}
      <div className="filter-section">
        <div className="price-header">
          <h4 className="filter-subheading">
            Price Range: <span className="price-value">$1 - ${priceMax}</span>
          </h4>
        </div>
        <div className="price-slider-container">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={priceMax}
            onChange={(e) => onChangePriceMax(Number(e.target.value))}
            className="price-slider"
          />
          <div className="price-labels">
            <span>$1</span>
            <span>$10</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
