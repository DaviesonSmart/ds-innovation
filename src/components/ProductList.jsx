// src/components/ProductList.jsx
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { fetchProducts } from "../firebaseHelpers";
import { useNavigate } from "react-router-dom";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₦10,000", min: 0, max: 9999 },
  { label: "₦10,000 – ₦12,000", min: 10000, max: 12000 },
  { label: "Above ₦12,000", min: 12001, max: Infinity },
];

export default function ProductList({ enableNavigation = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const navigate = useNavigate();

  // Fetch products from Firestore
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Extract categories dynamically
  const categories = useMemo(() => {
    if (!products.length) return ["All"];
    const unique = Array.from(new Set(products.map((p) => p.category?.trim())));
    return ["All", ...unique.filter(Boolean)];
  }, [products]);

  // Apply filters (Shop Page)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const category = (p.category || "").trim();
      const inCategory =
        selectedCategory === "All" || category === selectedCategory;

      const priceRange = priceRanges.find(
        (range) => range.label === selectedPriceRange
      );
      const price = Number(p.price) || 0;
      const inPrice =
        selectedPriceRange === "All" ||
        (price >= priceRange.min && price <= priceRange.max);

      return inCategory && inPrice;
    });
  }, [products, selectedCategory, selectedPriceRange]);

  // Homepage featured categories
  const homepageCategories = ["Gowns", "Two Pieces", "Jumpsuit"];

  // Group homepage products by category
  const groupedProducts = useMemo(() => {
    const groups = {};
    products.forEach((p) => {
      const cat = p.category?.trim();
      if (homepageCategories.includes(cat)) {
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(p);
      }
    });
    return groups;
  }, [products]);

  return (
    <Container fluid className="py-5 px-4 bg-light">
      <h2 className="text-center fw-bold mb-4">
        {enableNavigation ? "Our Latest Collections" : "Shop Our Collection"}
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-2">Loading products...</p>
        </div>
      ) : (
        <>
          {/* --- SHOP PAGE --- */}
          {!enableNavigation && (
            <>
              {/* Filter by Category */}
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

              {/* Filter by Price */}
              <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.label}
                    variant={
                      selectedPriceRange === range.label
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => setSelectedPriceRange(range.label)}
                    className="rounded-pill"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
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
            </>
          )}

          {/* --- HOMEPAGE (1 PRODUCT PER CATEGORY) --- */}
          {enableNavigation && (
            <>
              {homepageCategories.map((category) => {
                const items = groupedProducts[category] || [];
                if (!items.length) return null;
                return (
                  <div key={category} className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="fw-bold text-capitalize mb-0">
                        {category}
                      </h4>
                      <Button
                        variant="link"
                        className="text-decoration-none fw-semibold"
                        onClick={() =>
                          navigate(
                            `/shop?category=${encodeURIComponent(category)}`
                          )
                        }
                      >
                        See More →
                      </Button>
                    </div>

                    {/* Display only 1 product per category */}
                    <Row className="gx-4 gy-4">
                      {items.slice(0, 1).map((product) => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
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
                  </div>
                );
              })}

              <div className="text-center mt-5">
                <Button
                  variant="dark"
                  size="lg"
                  onClick={() => navigate("/shop")}
                  className="px-4 rounded-pill"
                >
                  View All Products
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
}
