import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Star } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, subtotal, addToCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartItems.length > 0 ? 5.0 : 0.0;
  const taxes = cartItems.length > 0 ? 1.2 : 0.0;
  const total = subtotal + shipping + taxes;

  const recommendedProducts = [
    {
      _id: 'rec1',
      name: 'FLAT WHITE',
      description: 'Espresso with micro-foam milk',
      price: 3.0,
      currency: 'USD',
      ratingsAverage: 4.5,
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    },
    {
      _id: 'rec2',
      name: 'GREEN TEA',
      description: 'Healthy green tea',
      price: 2.0,
      currency: 'USD',
      ratingsAverage: 2.8,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    },
    {
      _id: 'rec3',
      name: 'CORTADO',
      description: 'Espresso with small amount of milk',
      price: 3.0,
      currency: 'USD',
      ratingsAverage: 2.7,
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="cart-page-wrapper">

      <div className="cart-banner">
        <h1>Shopping Cart</h1>
        <p>Savor our exceptional hot drinks, every sip comes with comfort and flavor.</p>
      </div>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any drinks yet.</p>
            <Link to="/products" className="shop-now-btn">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="cart-main-content">

            <div className="cart-items-section">
              <h2>Your Cart</h2>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <div className="item-header">
                        <h3>{item.name}</h3>
                        <span className="item-price">USD {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="item-desc">{item.description}</p>

                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(item._id)} aria-label="Decrease">
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item._id)} aria-label="Increase">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>USD {shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Taxes:</span>
                <span>USD {taxes.toFixed(2)}</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>USD {total.toFixed(2)}</span>
              </div>

                {/* add navigate */}
              <button
                className="checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}


        <div className="recommended-section">
          <h2>Recommended Products</h2>
          <div className="recommended-grid">
            {recommendedProducts.map((prod) => (
              <div key={prod._id} className="rec-card">
                <img src={prod.image} alt={prod.name} />
                <div className="rec-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <div className="rec-rating">
                    <span>{prod.ratingsAverage}</span>
                    <Star size={12} fill="#EAB308" color="#EAB308" />
                  </div>
                  <div className="rec-price">USD {prod.price.toFixed(2)}</div>
                  <button className="rec-add-btn" onClick={() => addToCart(prod)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

