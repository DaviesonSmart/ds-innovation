import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

import { db } from "../firebaseHelpers"; // ✅ Make sure this file exists at src/firebaseHelpers.js
import { collection, getDocs } from "firebase/firestore";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>SmartTech Collections | Shop</title>
        <meta
          name="description"
          content="Explore our trendy female wears including skirts, tops, and gowns. Affordable prices with premium quality!"
        />
      </Helmet>

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">Shop Our Female Wears</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center">
            No products available yet. Add some first.
          </p>
        ) : (
          <Row className="gx-4 gy-5">
            {products.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
