import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { motion } from "framer-motion";


export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setShowToast(true);
      setEmail("");
    }
  };

          return (
        <motion.div
          className="newsletter-section"
          initial={{ opacity: 200, y: 90 }}
          whileInView={{ opacity: 1, y: 8 }}
          transition={{ duration: 0.8 }}
        >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
                    <p
          className="text-primary fw-semibold mb-2"
          style={{ letterSpacing: "2px" }}
        >
          STAY CONNECTED
          </p>

<h2 className="fw-bold display-6 mb-3">
  Get Exclusive Fashion Updates
</h2>

<p className="text-muted">
  Subscribe to receive new arrivals, special discounts,
  fashion tips, and members-only offers.
</p>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit} className="d-flex gap-2" role="form">
              <Form.Control
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-pill px-3"
                autoComplete="email"
                aria-label="Email address"
                required
              />
              <Button
                type="submit"
                variant="dark"
                className="rounded-pill px-4"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Newsletter</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Subscribed successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </motion.div>
  );
}
