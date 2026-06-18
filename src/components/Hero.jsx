import React from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroFashion from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
       backgroundImage: `url(${heroFashion})`
      }}
    >
      <div className="hero-overlay">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <motion.span
              className="hero-badge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SMARTTECH COLLECTIONS
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Elevate Your Style
            </motion.h1>

            <motion.p
              className="hero-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Discover stunning skirts, elegant gowns, crop tops, and
              fashionable outfits crafted for confident women who love elegance.
            </motion.p>

            <motion.div
              className="d-flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                as={Link}
                to="/shop"
                size="lg"
                variant="light"
                className="rounded-pill px-4 fw-semibold"
              >
                Shop Now
              </Button>

              <Button
                as={Link}
                to="/shop"
                size="lg"
                variant="outline-light"
                className="rounded-pill px-4"
              >
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}