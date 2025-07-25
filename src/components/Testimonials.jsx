import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


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
    <div className="bg-white py-5">
      <div className="container text-center">
        <h3 className="mb-4">What Our Customers Say</h3>
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
              <motion.div
                className="h-100"
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
                    <Card.Text>"{testimonial.review}"</Card.Text>
                    <Card.Title className="text-muted fs-6">
                      {testimonial.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
