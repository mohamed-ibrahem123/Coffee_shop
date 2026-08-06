import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="caffinity-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: COLLECTIONS */}
          <div className="footer-column">
            <h4 className="footer-heading">COLLECTIONS</h4>
            <ul className="footer-list">
              <li><Link to="/products">Energy Drinks</Link></li>
              <li><Link to="/products">Specialty Drinks</Link></li>
              <li><Link to="/products">Milkshakes</Link></li>
              <li><Link to="/products">Smoothies</Link></li>
              <li><Link to="/products">Fresh Juices</Link></li>
              <li><Link to="/products">Cold Drinks</Link></li>
              <li><Link to="/products">Hot Drinks</Link></li>
            </ul>
          </div>

          {/* Column 2: LEARN */}
          <div className="footer-column">
            <h4 className="footer-heading">LEARN</h4>
            <ul className="footer-list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/about">About our teas</Link></li>
              <li><Link to="/about">Tea academy</Link></li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SERVICE */}
          <div className="footer-column">
            <h4 className="footer-heading">CUSTOMER SERVICE</h4>
            <ul className="footer-list">
              <li><Link to="/contact">Ordering and payment</Link></li>
              <li><Link to="/contact">Delivery</Link></li>
              <li><Link to="/contact">Privacy and policy</Link></li>
              <li><Link to="/contact">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="footer-column">
            <h4 className="footer-heading">CONTACT US</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin className="contact-icon" size={16} />
                <span>3 Falehi, Falani St, Pazdaran Ave, Shiraz, Fars Province, Iran</span>
              </li>
              <li>
                <Mail className="contact-icon" size={16} />
                <span>coffee_shop@gmail.com</span>
              </li>
              <li>
                <Phone className="contact-icon" size={16} />
                <span>+98 9173056406</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p>© 2026 Caffinity. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
