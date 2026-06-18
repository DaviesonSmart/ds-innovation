import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { motion } from "framer-motion";
import {
  FaGem,
  FaShippingFast,
  FaShieldAlt,
  FaTshirt,
} from "react-icons/fa";


export default function About() {
  return (
    <>
     

      {/* Hero Section */}
      <motion.div
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "80px 20px" }}
        >
          <h1 className="display-4 fw-bold">About SmartTech Collections</h1>
          <p className="lead">Where elegance meets modern fashion</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
                alt="Fashion Style"
                fluid
                className="rounded-4 shadow"
              />
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="fw-bold">Our Story</h2>
              <p className="text-muted">
                SmartTech Collections is your go-to destination for trendy,
                affordable, and high-quality female wear. From casual crop tops
                to elegant gowns, our fashion pieces are made to empower and
                elevate.
              </p>
              <p className="text-muted">
                Our designs are inspired by the confident, modern woman —
                someone who loves to stand out effortlessly.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Why Choose Us */}
        <section className="mt-5 py-5">
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
      More than clothing — we deliver style, quality and confidence.
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
          Reliable delivery to customers
          across Nigeria.
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
    </>
  );
}



