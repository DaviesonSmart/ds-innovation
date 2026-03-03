// src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { db } from "../firebaseHelpers";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("featured", "==", true),
          limit(4)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!products.length) {
    return <p className="text-center text-muted">No featured products available.</p>;
  }

  return (
    <Container className="py-5">
      <h3 className="text-center fw-bold mb-4">Featured Products</h3>
      <Row className="gx-4 gy-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
          <motion.div
  className="featured-card"
  whileHover={{ scale: 1.03 }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  onClick={() => navigate(`/shop?category=${product.category}`)}
>
  <div className="featured-img-wrapper">
    <img src={product.images?.[0]} alt={product.name} />
  </div>

  <div className="featured-info">
    <h6>{product.name}</h6>
    <span className="price">₦{product.price}</span>
  </div>
</motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}