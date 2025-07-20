import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { db, collection, getDocs } from "../firebaseHelpers"; // 👈 import Firestore functions


// Price ranges
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₦10,000", min: 0, max: 9999 },
  { label: "₦10,000 – ₦12,000", min: 10000, max: 12000 },
  { label: "Above ₦12,000", min: 12001, max: Infinity },
];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const querySnapshot = await getDocs(collection(db, "products"));
       const loadedProducts = [];

       querySnapshot.forEach((doc) => {
         loadedProducts.push({ id: doc.id, ...doc.data() });
       });

       setProducts(loadedProducts);
     } catch (error) {
       console.error("Error fetching products:", error);
     }
   };

   fetchProducts();
 }, []);


  // Extract categories from loaded products
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const inCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const priceRange = priceRanges.find(
        (range) => range.label === selectedPriceRange
      );

      const inPrice =
        selectedPriceRange === "All" ||
        (p.price >= priceRange.min && p.price <= priceRange.max);

      return inCategory && inPrice;
    });
  }, [products, selectedCategory, selectedPriceRange]);

  return (
    <Container fluid className="py-5 px-4">
      <h2 className="mb-4 fw-bold text-center">Shop Our Collection</h2>

      {/* Category Filter */}
      <div className="d-flex justify-content-center mb-3 flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "dark" : "outline-dark"}
            onClick={() => setSelectedCategory(cat)}
            className="rounded-pill text-capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {priceRanges.map((range) => (
          <Button
            key={range.label}
            variant={
              selectedPriceRange === range.label ? "primary" : "outline-primary"
            }
            onClick={() => setSelectedPriceRange(range.label)}
            className="rounded-pill"
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <Row className="gx-4 gy-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No products found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
