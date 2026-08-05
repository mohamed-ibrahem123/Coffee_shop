import React from 'react';
import './SidebarFilters.css';

const CATEGORIES = [
  'Espresso',
  'Coffee',
  'Tea',
  'Specialty',
  'Milkshakes',
  'Smoothies',
  'Fresh Juices',
];

const SidebarFilters = ({
  selectedCategory,
  onSelectCategory,
  priceMax,
  onChangePriceMax,
  selectedDrinkTypes,
  onToggleDrinkType,
}) => {
  return (
    <aside className="sidebar-filters-card">
      <h3 className="filters-heading">Filters</h3>

      {/* Categories Section */}
      <div className="filter-section">
        <h4 className="filter-subheading">Categories</h4>
        <ul className="categories-list">
          <li
            className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => onSelectCategory('')}
          >
            All Categories
          </li>
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
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
            Price Range: <span className="price-value">$0 - ${priceMax}</span>
          </h4>
        </div>
        <div className="price-slider-container">
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={priceMax}
            onChange={(e) => onChangePriceMax(Number(e.target.value))}
            className="price-slider"
          />
          <div className="price-labels">
            <span>$0</span>
            <span>$0 - $20</span>
          </div>
        </div>
      </div>

      <div className="filter-divider" />

      {/* Drink Types Section */}
      <div className="filter-section">
        <h4 className="filter-subheading">Drink Types</h4>
        <div className="drink-types-list">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedDrinkTypes.includes('Hot Drinks')}
              onChange={() => onToggleDrinkType('Hot Drinks')}
              className="custom-checkbox"
            />
            <span>Hot Drinks</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedDrinkTypes.includes('Cold Drinks')}
              onChange={() => onToggleDrinkType('Cold Drinks')}
              className="custom-checkbox"
            />
            <span>Cold Drinks</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
