import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { auth } from "../firebase"; // ✅ Assuming you've merged helpers into firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Simple role check (later, use Firestore role if needed)
      const isAdmin = email === "admin@gmail.com";

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "SmartTech User",
        role: isAdmin ? "admin" : "customer",
      };

      localStorage.setItem("smarttech-user", JSON.stringify(userData));
      localStorage.setItem("smarttech-loggedin", "true");

      toast.success(`Welcome back, ${userData.name}`);
      navigate(isAdmin ? "/admin" : "/shop");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Invalid login credentials. Please check your email and password."
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-center mb-4 fw-bold">Login to SmartTech</h3>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="dark"
                className="w-100 rounded-pill"
              >
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none">
                Register here
              </Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/forgot-password" className="text-muted small">
                Forgot Password?
              </Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
