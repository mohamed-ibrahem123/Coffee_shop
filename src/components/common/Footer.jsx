import React from 'react';
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
              <li><a href="#energy-drinks">Energy Drinks</a></li>
              <li><a href="#specialty-drinks">Specialty Drinks</a></li>
              <li><a href="#milkshakes">Milkshakes</a></li>
              <li><a href="#smoothies">Smoothies</a></li>
              <li><a href="#fresh-juices">Fresh Juices</a></li>
              <li><a href="#cold-drinks">Cold Drinks</a></li>
              <li><a href="#hot-drinks">Hot Drinks</a></li>
            </ul>
          </div>

          {/* Column 2: LEARN */}
          <div className="footer-column">
            <h4 className="footer-heading">LEARN</h4>
            <ul className="footer-list">
              <li><a href="#about-us">About us</a></li>
              <li><a href="#about-teas">About our teas</a></li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SERVICE */}
          <div className="footer-column">
            <h4 className="footer-heading">CUSTOMER SERVICE</h4>
            <ul className="footer-list">
              <li><a href="#ordering-payment">Ordering and payment</a></li>
              <li><a href="#delivery">Delivery</a></li>
              <li><a href="#privacy-policy">Privacy and policy</a></li>
              <li><a href="#terms-conditions">Terms & Conditions</a></li>
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
