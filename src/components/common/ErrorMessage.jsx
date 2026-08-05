import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'Failed to load products from server.', onRetry }) => {
  return (
    <div className="error-message-card">
      <AlertCircle className="error-icon" size={36} />
      <h3 className="error-title">Unable to Connect</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
