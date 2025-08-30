// Register.jsx
import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseHelpers"; // make sure db is exported
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create Firestore document for user
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name, // ✅ include full name
      email: user.email,
      role: "user", // default role
      createdAt: new Date(),
    });

    toast.success("Registration successful 🎉 Please log in.");
    navigate("/login");
  } catch (error) {
    toast.error("Registration failed: " + error.message);
    console.error("Register error:", error);
  }
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
