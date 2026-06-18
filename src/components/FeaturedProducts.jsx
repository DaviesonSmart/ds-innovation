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
                        limit(8)
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
                  <Container fluid="lg" className="py-5">
                    <div className="text-center mb-5">
                <p
                  className="text-primary fw-semibold mb-2"
                  style={{ letterSpacing: "2px" }}
                >
                  TRENDING NOW
                </p>

                <h2 className="fw-bold display-6">
                  Featured Collection
                </h2>

                <p className="text-muted">
                  Discover our most loved fashion pieces.
                </p>
              </div>
                  <Row className="g-2">
                {products.map((product) => (
                  <Col key={product.id} xs={6} md={4} lg={3}>
                    <motion.div
                      className="featured-card"
                      whileHover={{ y: -10,}}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                  <div className="featured-img-wrapper">

            <div className="featured-badge">
              NEW
            </div>

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="img-primary"
              loading="lazy"
            />

            {product.images?.[1] && (
              <img
                src={product.images?.[1]}
                alt={product.name}
                className="img-hover"
                loading="lazy"
              />
            )}

          </div>

              <div className="featured-info">
                <h6 className="featured-title">
                  {product.name}
                </h6>

                <div className="featured-price">
                  ₦{Number(product.price).toLocaleString()}
                </div>

                <div className="featured-view">
                  View Details →
                </div>
              </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
                  </Container>
                );
              }