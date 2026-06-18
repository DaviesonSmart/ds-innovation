// src/components/Footer.jsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section">

      <Container>

        <Row className="gy-5">

          {/* Brand */}
          <Col lg={4}>
            <h3 className="footer-logo">
              SmartTech Collections
            </h3>

            <p className="footer-text">
              Fashion designed for confident women.
              Discover premium gowns, skirts, crop tops,
              leggings, and stylish everyday outfits.
            </p>

            <div className="footer-socials">

         <div className="footer-socials">

            <a
              href="https://facebook.com/Smart Collections"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com/am_smartcollection"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/2348107918172?text=Hello%20I%20want%20to%20make%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://tiktok.com/@smart_collection4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>

</div>

            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="footer-heading">
              Shop
            </h5>

            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </Col>

          {/* Company */}
          <Col lg={2} md={6}>
            <h5 className="footer-heading">
              Company
            </h5>

            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={4}>
            <h5 className="footer-heading">
              Contact
            </h5>

            <p className="footer-contact">
              📍 Lagos, Nigeria
            </p>

            <p className="footer-contact">
              📞 +234 810 791 8172
            </p>

            <p className="footer-contact">
              ✉ support@smarttechcollections.com
            </p>
          </Col>

        </Row>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          © {new Date().getFullYear()} SmartTech Collections.
          All Rights Reserved.
        </div>

      </Container>

    </footer>
  );
}