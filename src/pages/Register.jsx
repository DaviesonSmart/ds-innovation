import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Firebase setup

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // ✅ Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ✅ Optional: Save user to localStorage if you still want to
      const existingUsers =
        JSON.parse(localStorage.getItem("smarttech-users")) || [];
      const newUser = { name, email, uid: user.uid };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("smarttech-users", JSON.stringify(updatedUsers));

      toast.success(`Welcome, ${name}! 🎉`);
      navigate("/login");
    } catch (error) {
      console.error("Firebase registration error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered ❌");
      } else {
        toast.error("Registration failed. Try again ❌");
      }
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
            <h3 className="text-center mb-4">Create an Account</h3>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
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
