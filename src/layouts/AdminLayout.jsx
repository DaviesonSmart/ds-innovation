// src/layouts/AdminLayout.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminLayout.css"; // (create this file next)

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Row className="min-vh-100">
      {/* Sidebar */}
      <Col md={3} className="bg-dark text-white p-4">
        <h4 className="mb-4">SmartTech Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin">
              Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/orders">
              Orders
            </a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/products">
              Products
            </a>
          </li>
        </ul>

        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
        
      </Col>

      {/* Main Content */}
      <Col md={9} className="p-4 bg-light">
        {children}
      </Col>
    </Row>
  );
}
