import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "smartboss") {
      localStorage.setItem("smarttech-admin", "true");
      navigate("/admin");
    } else {
      alert("Incorrect password 🚫");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Admin Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Admin Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100 rounded-pill">
              Login as Admin
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
