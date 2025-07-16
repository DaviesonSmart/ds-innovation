import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "admin@smarttech.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      const adminData = {
        name: "Admin",
        email,
        role: "admin",
      };

      localStorage.setItem("smarttech-user", JSON.stringify(adminData));
      localStorage.setItem("smarttech-loggedin", "true");

      toast.success("Welcome Admin 👑");
      navigate("/admin");
      return;
    }

    // ✅ Fetch users list from localStorage
    const allUsers = JSON.parse(localStorage.getItem("smarttech-users")) || [];

    // ✅ Find user that matches the credentials
    const matchedUser = allUsers.find(
      (user) =>
        user.email === email.trim().toLowerCase() && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("smarttech-user", JSON.stringify(matchedUser));
      localStorage.setItem("smarttech-loggedin", "true");

      toast.success(`Welcome back, ${matchedUser.name}`);
      navigate("/shop");
    } else {
      toast.error("Invalid credentials 🚫");
    }
  };
  

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-center mb-4">Login to SmartTech</h3>
            <Form onSubmit={handleLogin}>
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
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
