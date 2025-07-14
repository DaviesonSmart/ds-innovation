// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="fw-bold">SmartTech Collections</h5>
            <p className="text-muted">
              Style that speaks for you. Shop stunning skirts, elegant gowns,
              and trendsetting tops.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-light text-decoration-none">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1">
              <strong>Email:</strong> support@smarttechcollections.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> +234 000 000 0000
            </p>
            <p className="mb-0">
              <strong>Address:</strong> Lagos, Nigeria
            </p>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <p className="text-center text-muted mb-0">
          &copy; {new Date().getFullYear()} SmartTech Collections. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
