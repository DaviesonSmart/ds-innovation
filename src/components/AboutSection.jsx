import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaGem,
  FaShippingFast,
  FaShieldAlt,
  FaTshirt,
} from "react-icons/fa";

export default function AboutSection() {
  return (
    <Container className="py-5">

      {/* Our Story */}
      <Row className="align-items-center mb-5">
        <Col lg={6}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
              alt="Fashion Style"
              fluid
              className="story-image"
            />
          </motion.div>
        </Col>

        <Col lg={6}>
          <div className="story-card">

            <span className="story-tag">
              OUR STORY
            </span>

            <h2 className="story-title">
              Fashion That Inspires Confidence
            </h2>

            <p>
              SmartTech Collections was created to help women
              express confidence through fashion.
            </p>

            <p>
              From elegant gowns to trendy skirts and crop tops,
              every piece is carefully selected to combine style,
              comfort and quality.
            </p>

          </div>
        </Col>
      </Row>

      {/* Why Choose Us */}

      <section className="py-5">
        <div className="text-center mb-5">

          <p
            className="text-primary fw-semibold mb-2"
            style={{ letterSpacing: "2px" }}
          >
            WHY CHOOSE US
          </p>

          <h2 className="fw-bold display-6">
            Fashion Designed For Confidence
          </h2>

          <p className="text-muted">
            More than clothing — we deliver style,
            quality and confidence.
          </p>

        </div>

        <Row className="g-4">

          <Col md={6} lg={3}>
            <motion.div
              whileHover={{ y: -10 }}
              className="why-card"
            >
              <FaGem size={40} className="why-icon" />
              <h5>Premium Quality</h5>
              <p>
                Carefully selected fabrics for comfort,
                durability and elegance.
              </p>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div
              whileHover={{ y: -10 }}
              className="why-card"
            >
              <FaTshirt size={40} className="why-icon" />
              <h5>Trendy Styles</h5>
              <p>
                Stay ahead with fashion collections
                inspired by modern women.
              </p>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div
              whileHover={{ y: -10 }}
              className="why-card"
            >
              <FaShippingFast size={40} className="why-icon" />
              <h5>Fast Delivery</h5>
              <p>
                Reliable delivery across Nigeria.
              </p>
            </motion.div>
          </Col>

          <Col md={6} lg={3}>
            <motion.div
              whileHover={{ y: -10 }}
              className="why-card"
            >
              <FaShieldAlt size={40} className="why-icon" />
              <h5>Secure Shopping</h5>
              <p>
                Safe checkout experience and trusted service.
              </p>
            </motion.div>
          </Col>

        </Row>
      </section>

    </Container>
  );
}