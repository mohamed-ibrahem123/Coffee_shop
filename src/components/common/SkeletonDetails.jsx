import './Skeleton.css';

const SkeletonDetails = () => {
  return (
    <div className="skeleton-details-container animate-pulse">
      <div className="skeleton-details-top">
        <div className="skeleton-details-image-group">
          <div className="skeleton-details-main-img skeleton-box" />
          <div className="skeleton-thumbnails">
            <div className="skeleton-thumb skeleton-box" />
            <div className="skeleton-thumb skeleton-box" />
            <div className="skeleton-thumb skeleton-box" />
          </div>
        </div>
        <div className="skeleton-details-info">
          <div className="skeleton-details-title skeleton-box" />
          <div className="skeleton-details-price skeleton-box" />
          <div className="skeleton-details-rating skeleton-box" />
          <div className="skeleton-details-desc skeleton-box" />
          <div className="skeleton-details-desc skeleton-box" style={{ width: '80%' }} />
          <div className="skeleton-details-options skeleton-box" />
          <div className="skeleton-details-options skeleton-box" />
          <div className="skeleton-details-btns">
            <div className="skeleton-action-btn skeleton-box" />
            <div className="skeleton-action-btn skeleton-box" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetails;
