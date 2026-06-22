import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { db } from "../firebaseHelpers";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
   const fetchProducts = async () => {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(4)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section className="new-arrivals-section py-5">
      <Container>

        <div className="text-center mb-5">
          <p
            className="text-primary fw-semibold mb-2"
            style={{ letterSpacing: "2px" }}
          >
            JUST ARRIVED
          </p>

          <h2 className="fw-bold display-6">
            New Arrivals
          </h2>

          <p className="text-muted">
            Fresh styles recently added to our collection.
          </p>
        </div>

        <Row className="g-4">

          {products.map((product) => (
            <Col lg={3} md={6} key={product.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="arrival-card"
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                <div className="arrival-image-wrapper">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                  />
                </div>

                <div className="arrival-info">

                  <span className="arrival-badge">
                    NEW
                  </span>

                  <h6>{product.name}</h6>

                  <p className="arrival-price">
                    ₦{Number(product.price).toLocaleString()}
                  </p>

                </div>
              </motion.div>
            </Col>
          ))}

        </Row>

        <div className="text-center mt-5">
          <Button
            variant="dark"
            size="lg"
            onClick={() => navigate("/shop")}
          >
            View All Products
          </Button>
        </div>

      </Container>
    </section>
  );
}