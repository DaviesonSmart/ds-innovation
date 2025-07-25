import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this file exports `auth` correctly

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

      const isAdmin = email === "admin@gmail.com"; // Replace this with real admin role logic

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "User",
        role: isAdmin ? "admin" : "customer",
      };

      localStorage.setItem("smarttech-user", JSON.stringify(userData));
      localStorage.setItem("smarttech-loggedin", "true");

      toast.success(`Welcome back, ${userData.name}`);
      navigate(isAdmin ? "/admin" : "/shop");
    } catch (error) {
      console.error(error);
      toast.error("Invalid login credentials");
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
            <p className="mt-2">
              <a href="/forgot-password">Forgot password?</a>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
