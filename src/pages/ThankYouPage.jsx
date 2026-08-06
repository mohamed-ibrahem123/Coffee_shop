import './ThankYouPage.css';
import { Link } from 'react-router-dom';

function ThankYouPage() {
  return (
    <div className="thank-you-page">

      <div className="thank-you-card">

        <div className="thank-you-icon">
          ☕
        </div>

        <h1>
          Thank You!
        </h1>

        <p>
          Your order has been placed successfully.
          <br />
          We are preparing your coffee with love ♡♡♡.
        </p>

        <Link
          to="/"
          className="thank-you-btn"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default ThankYouPage;