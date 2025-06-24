import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="text-center py-5">
        <motion.h1
          className="display-3 fw-bold text-danger"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          404
        </motion.h1>
        <motion.p
          className="fs-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button as={Link} to="/" variant="dark" className="mt-3">
            Go Back Home
          </Button>
        </motion.div>
      </Container>
    </motion.div>
  );
}
