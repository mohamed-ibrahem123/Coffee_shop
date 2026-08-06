import './Skeleton.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-product-card animate-pulse">
      <div className="skeleton-image skeleton-box" />
      <div className="skeleton-content">
        <div className="skeleton-title skeleton-box" />
        <div className="skeleton-desc skeleton-box" />
        <div className="skeleton-rating skeleton-box" />
        <div className="skeleton-price-row">
          <div className="skeleton-price skeleton-box" />
          <div className="skeleton-btn skeleton-box" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
