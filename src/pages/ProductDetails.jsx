// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import { fetchProducts } from "../firebaseHelpers"; // ✅ get products from Firestore
import NavigationBar from "../components/NavigationBar";
import Loader from "../components/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const found = products.find((p) => p.id === id); // Firestore doc.id is a string
        setProduct(found);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
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
              {/* ✅ If multiple images exist, show carousel */}
              {Array.isArray(product.images) && product.images.length > 1 ? (
                <Carousel>
                  {product.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fluid
                        className="rounded"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <Image
                  src={product.image || product.images?.[0]}
                  alt={product.name}
                  fluid
                  className="rounded"
                />
              )}
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
              <h4>₦{Number(product.price || 0).toLocaleString()}</h4>
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
