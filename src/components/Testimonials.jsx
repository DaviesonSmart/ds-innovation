// src/components/Testimonials.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { fadeRight } from "../animations"; // 👈 import animation variant

const testimonials = [
  {
    id: 1,
    name: "Ada N.",
    review:
      "The clothes are super comfy and stylish! I love SmartTech Collections!",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    id: 2,
    name: "Chinwe O.",
    review: "Great quality and fast delivery. Will definitely shop again!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Grace I.",
    review: "Best customer service and the gowns are 🔥🔥🔥.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      className="bg-white py-5"
      variants={fadeRight}
      initial="initial"
      animate="animate"
    >
      <div className="container text-center">
        <h3 className="mb-4 fw-bold">What Our Customers Say</h3>

        <div className="row">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Body>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle mb-3"
                    width="80"
                    height="80"
                  />
                  <Card.Text className="fst-italic">
                    "{testimonial.review}"
                  </Card.Text>
                  <Card.Title className="text-muted fs-6">
                    {testimonial.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
