import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("smarttech-users")) || [];

    // Check if email already exists
    const emailExists = users.some(
      (user) => user.email === email.trim().toLowerCase()
    );

    if (emailExists) {
      toast.error("Email already exists 🚫");
      return;
    }

    // Create user
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("smarttech-users", JSON.stringify(users));

    toast.success("Registration successful ✅");

    // Redirect to login
    navigate("/login");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-center mb-4">Register on SmartTech</h3>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="w-100 rounded-pill"
              >
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
