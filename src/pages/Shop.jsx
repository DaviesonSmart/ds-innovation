import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("smarttech-products")) || [];
    setProducts(stored);
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
        <Row className="gx-4 gy-5">
          {products.length === 0 ? (
            <p className="text-center">
              No products available yet. Add some first.
            </p>
          ) : (
            products.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
