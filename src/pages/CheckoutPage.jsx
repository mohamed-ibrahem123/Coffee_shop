import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

// Shipping cost and fixed taxes used in the order summary
const SHIPPING = 5.0;
const TAXES = 1.2;

export default function CheckoutPage() {
  // Used to navigate the user to another page after completing the order
  const navigate = useNavigate();

  // Get cart data and functions from Cart Context
  const {
    cartItems, // Products added to cart
    subtotal, // Total price of products before shipping and taxes
    clearCart, // Clears the cart after successful checkout
  } = useCart();

  // Store customer information entered in the checkout form
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  // Store validation error messages for form fields
  const [errors, setErrors] = useState({});

  // Calculate checkout costs
  const shipping = cartItems.length > 0 ? SHIPPING : 0;
  const taxes = cartItems.length > 0 ? TAXES : 0;
  const total = subtotal + shipping + taxes;

  // Handles changes in form inputs and updates the form state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error message when the user starts correcting the field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Checks that all required fields contain valid data
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    return newErrors;
  };

  // Handles form submission after clicking Place Order
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation before submitting the order
    const validationErrors = validate();

    // If there are errors, display them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear cart after successful order placement
    clearCart();

    // Redirect user to thank you page
    navigate("/thank-you");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-content">
        {/* Checkout form containing customer information and order summary */}
        <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="checkout-form-title">Checkout</h2>

          {/* Customer full name input */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          {errors.fullName && <p className="error">{errors.fullName}</p>}

          {/* Customer email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {errors.email && <p className="error">{errors.email}</p>}

          {/* Customer phone number input */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {errors.phone && <p className="error">{errors.phone}</p>}

          {/* Customer address input */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          {errors.address && <p className="error">{errors.address}</p>}

          {/* Customer city input */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          {/* Optional order notes */}
          <textarea
            name="notes"
            placeholder="Order Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />

          {/* Displays products and total order price */}
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>

            {/* Display every product added to cart */}
            {cartItems.map((item) => (
              <div className="checkout-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-item-img"
                />
                <div className="checkout-item-info">
                  {/* Product name */}
                  <p className="checkout-item-name">{item.name}</p>

                  {/* Product quantity */}
                  <span>Qty: {item.quantity}</span>
                </div>

                {/* Total price for this product based on quantity */}
                <span className="checkout-item-price">
                  USD {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <hr />

            {/* Order subtotal before extra costs */}
            <div className="summary-row">
              <span>Subtotal:</span>

              <span>USD {subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping cost */}
            <div className="summary-row">
              <span>Shipping:</span>

              <span>USD {shipping.toFixed(2)}</span>
            </div>

            {/* Taxes amount */}
            <div className="summary-row">
              <span>Taxes:</span>

              <span>USD {taxes.toFixed(2)}</span>
            </div>

            <hr />

            {/* Final amount user has to pay */}
            <div className="summary-row total-row">
              <strong>Total:</strong>

              <strong>USD {total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Submit checkout form */}
          <button type="submit" className="checkout-btn-primary">
            PLACE ORDER
          </button>
        </form>
      </div>
    </div>
  );
}
