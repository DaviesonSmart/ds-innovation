import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dress9Img from "../assets/dress9.JPG"; // Make sure to add a real image here
import { toast } from "react-toastify";

export default function Hero() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                whileInView={{ opacity: 1, y: 0 }}
                src={dress9Img} // Replace with your image path
                alt="Stylish Woman"
                className="img-fluid rounded-4 shadow"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
  import Footer from "../components/Footer"; // top of file

  // At the end of your return:
  <Footer />;
