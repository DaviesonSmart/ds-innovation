// src/components/Testimonials.jsx

import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ada N.",
    location: "Lagos, Nigeria",
    review:
      "The clothes are super comfy and stylish. I received so many compliments on my outfit.",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    id: 2,
    name: "Chinwe O.",
    location: "Abuja, Nigeria",
    review:
      "Amazing quality and fast delivery. The fabric felt even better than I expected.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Grace I.",
    location: "Port Harcourt, Nigeria",
    review:
      "SmartTech Collections never disappoints. Beautiful styles and excellent customer service.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-section py-5">
      <Container>

        <div className="text-center mb-5">
          <p
            className="text-primary fw-semibold mb-2"
            style={{ letterSpacing: "2px" }}
          >
            TESTIMONIALS
          </p>

          <h2 className="fw-bold display-6">
            What Our Customers Say
          </h2>

          <p className="text-muted">
            Real experiences from women who love SmartTech Collections.
          </p>
        </div>

        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.5,
                }}
                whileHover={{ y: -10 }}
              >
                <Card className="testimonial-card border-0">

                  <Card.Body>

                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="testimonial-star"
                        />
                      ))}
                    </div>

                    <Card.Text className="testimonial-review">
                      "{testimonial.review}"
                    </Card.Text>

                    <div className="d-flex align-items-center justify-content-center mt-4">

                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-avatar"
                      />

                      <div className="ms-3 text-start">
                        <h6 className="mb-0 fw-bold">
                          {testimonial.name}
                        </h6>

                        <small className="text-muted">
                          {testimonial.location}
                        </small>
                      </div>

                    </div>

                  </Card.Body>

                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
}