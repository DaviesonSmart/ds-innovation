// src/pages/Shop.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { db } from "../firebaseHelpers";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₦10,000", min: 0, max: 9999 },
  { label: "₦10,000 – ₦12,000", min: 10000, max: 12000 },
  { label: "Above ₦12,000", min: 12001, max: Infinity },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const selectedCategory = queryParams.get("category") || "All";
  const selectedPriceRange = queryParams.get("price") || "All";
  const searchQuery = queryParams.get("search")?.toLowerCase().trim() || "";

  // ✅ Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Get unique categories
  const categories = useMemo(() => {
    if (!products.length) return ["All"];
    const unique = [
      ...new Set(
        products.map((p) => p.category?.trim()).filter((c) => c && c !== "")
      ),
    ];
    return ["All", ...unique];
  }, [products]);

  // ✅ Filter products (category + price + search)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      );
    }

    // Price
    const priceRange = priceRanges.find((r) => r.label === selectedPriceRange);
    if (priceRange && priceRange.label !== "All") {
      filtered = filtered.filter((p) => {
        const price = parseFloat(p.price || 0);
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchQuery) ||
          p.category?.toLowerCase().includes(searchQuery)
      );
    }

    return filtered;
  }, [products, selectedCategory, selectedPriceRange, searchQuery]);

  // ✅ Handle category change
  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(location.search);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    navigate(`/shop?${params.toString()}`);
  };

  // ✅ Handle price change
  const handlePriceChange = (rangeLabel) => {
    const params = new URLSearchParams(location.search);
    if (rangeLabel === "All") params.delete("price");
    else params.set("price", rangeLabel);
    navigate(`/shop?${params.toString()}`);
  };

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
        <h2 className="text-center fw-bold mb-4">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategory === "All"
            ? "Shop Our Female Wears"
            : `Shop ${selectedCategory}`}
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            {/* 🏷 Category Filter */}
            <div className="d-flex justify-content-center mb-3 flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    <Button
                      variant={isActive ? "dark" : "outline-dark"}
                      onClick={() => handleCategoryChange(cat)}
                      className="rounded-pill text-capitalize position-relative"
                    >
                      {cat}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategory"
                          className="position-absolute bottom-0 start-0 end-0"
                          style={{
                            height: "3px",
                            background: "#000",
                            borderRadius: "2px",
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* 💰 Price Filter */}
            <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
              {priceRanges.map((range) => {
                const isActive = selectedPriceRange === range.label;
                return (
                  <motion.div
                    key={range.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    <Button
                      variant={isActive ? "primary" : "outline-primary"}
                      onClick={() => handlePriceChange(range.label)}
                      className="rounded-pill position-relative"
                    >
                      {range.label}
                      {isActive && (
                        <motion.div
                          layoutId="activePrice"
                          className="position-absolute bottom-0 start-0 end-0"
                          style={{
                            height: "3px",
                            background: "#0d6efd",
                            borderRadius: "2px",
                          }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* 🛍 Product Grid */}
            {filteredProducts.length === 0 ? (
              <p className="text-center">No products found.</p>
            ) : (
              <Row className="gx-4 gy-5">
                {filteredProducts.map((product) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
}
