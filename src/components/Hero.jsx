import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dress9Img from "../assets/dress9.jpg";
import { fadeInUp } from "../animations"; // ✅ now correctly imported

export default function Hero() {
  return (
    <motion.section
      className="py-5 bg-light"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold mb-3">
              Elevate Your Style with SmartTech Collections
            </h1>
            <p className="lead text-muted mb-4">
              Discover stunning skirts, elegant gowns, and chic crop tops made
              to turn heads.
            </p>
            <Button
              as={Link}
              to="/shop"
              variant="dark"
              size="lg"
              className="rounded-pill px-4"
            >
              Shop Now
            </Button>
          </Col>

          <Col md={6}>
            <motion.img
              src={dress9Img}
              alt="Stylish Woman"
              className="img-fluid rounded-4 shadow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}
