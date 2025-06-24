import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { motion } from "framer-motion";


export default function About() {
  return (
    <>
      <NavigationBar />

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
        <section className="mt-5">
          <h3 className="text-center fw-bold mb-4">Why Choose SmartTech?</h3>
          <Row className="text-center">
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-4 shadow-sm"
              >
                <h5 className="fw-bold">Quality Materials</h5>
                <p className="text-muted">
                  Every piece is crafted with care using premium fabrics.
                </p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-4 shadow-sm"
              >
                <h5 className="fw-bold">Trendy & Elegant</h5>
                <p className="text-muted">
                  We bring you modern styles that speak confidence and beauty.
                </p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-4 shadow-sm"
              >
                <h5 className="fw-bold">Affordable Luxury</h5>
                <p className="text-muted">
                  Look like a queen without breaking the bank.
                </p>
              </motion.div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}



