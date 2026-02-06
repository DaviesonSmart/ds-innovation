import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { db } from "../firebaseHelpers";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { categoryName } = useParams(); // 🔹 e.g. "Gowns"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔹 Filter by category (case-insensitive)
        const filtered = allProducts.filter(
          (p) => p.category?.toLowerCase().trim() === categoryName.toLowerCase()
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  return (
    <>
      <Helmet>
        <title>SmartTech Collections | {categoryName}</title>
        <meta
          name="description"
          content={`Explore ${categoryName} from SmartTech Collections — premium styles for every occasion.`}
        />
      </Helmet>

      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-capitalize mb-0">{categoryName}</h2>
          <Button
            as={Link}
            to="/shop"
            variant="outline-dark"
            className="rounded-pill"
          >
            ← Back to Shop
          </Button>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading {categoryName}...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">
            No products found for {categoryName}.
          </p>
        ) : (
          <Row className="gx-4 gy-4">
            {products.map((product) => (
              <Col key={product.id} xs={6} sm={6} md={4} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
