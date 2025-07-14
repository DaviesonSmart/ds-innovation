import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import NavigationBar from "../components/NavigationBar";
import Loader from "../components/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // simulate delay
    setTimeout(() => {
      const storedProducts =
        JSON.parse(localStorage.getItem("smarttech-products")) || [];
      const found = storedProducts.find((p) => p.id === parseInt(id));
      setProduct(found);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center py-5">Product not found</p>;

  return (
    <>
      <NavigationBar />
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={product.image} alt={product.name} fluid />
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2>{product.name}</h2>
              <p>{product.description || "No description available."}</p>
              <h4>₦{product.price?.toLocaleString()}</h4>
              <Button
                variant="dark"
                className="me-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              <Button as={Link} to="/shop" variant="outline-secondary">
                Back to Shop
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
