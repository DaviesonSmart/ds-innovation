import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseHelpers"; // make sure db is exported

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    try {
      // 1️⃣ Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2️⃣ Get role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        toast.error("No user record found!");
        await signOut(auth);
        return;
      }


      const userData = userDoc.data();

       

      // 3️⃣ Save to localStorage
      localStorage.setItem("smarttech-loggedin", "true");
      localStorage.setItem("smarttech-user", JSON.stringify(userData));

      toast.success("Login successful 🎉");

      // 4️⃣ Redirect
      if (userData.role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/shop");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
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
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
