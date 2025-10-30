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

  // --- Get filters from URL ---
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const selectedCategory = queryParams.get("category") || "All";
  const selectedPriceRange = queryParams.get("price") || "All";

  // --- Fetch products ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Extract all categories dynamically ---
  const categories = useMemo(() => {
    if (!products.length) return ["All"];
    const unique = [
      ...new Set(products.map((p) => p.category?.trim()).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [products]);

  // --- Filter products ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = p.category?.trim();
      const price = parseFloat(p.price || 0);

      const inCategory = selectedCategory === "All" || cat === selectedCategory;
      const priceRange = priceRanges.find(
        (r) => r.label === selectedPriceRange
      );
      const inPrice =
        selectedPriceRange === "All" ||
        (price >= priceRange.min && price <= priceRange.max);

      return inCategory && inPrice;
    });
  }, [products, selectedCategory, selectedPriceRange]);

  // --- Group filtered products by category ---
  const groupedProducts = useMemo(() => {
    const groups = {};
    filteredProducts.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filteredProducts]);

  // --- Update filters in URL ---
  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(location.search);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    navigate(`/shop?${params.toString()}`);
  };

  const handlePriceChange = (rangeLabel) => {
    const params = new URLSearchParams(location.search);
    if (rangeLabel === "All") params.delete("price");
    else params.set("price", rangeLabel);
    navigate(`/shop?${params.toString()}`);
  };

  // --- Scroll top on change ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory, selectedPriceRange]);

  return (
    <>
      <Helmet>
        <title>SmartTech Collections | Shop</title>
        <meta
          name="description"
          content="Shop classy female wears including gowns, two-piece sets, and jumpsuits. Premium designs at SmartTech Collections!"
        />
      </Helmet>

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">
          {selectedCategory === "All"
            ? "Shop Our Female Wears"
            : `Shop ${selectedCategory}`}
        </h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading products...</p>
          </div>
        ) : (
          <>
            {/* 🔘 Category Filter */}
            <div className="d-flex justify-content-center mb-3 flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "dark" : "outline-dark"}
                  onClick={() => handleCategoryChange(cat)}
                  className="rounded-pill text-capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* 💰 Price Filter */}
            <div className="d-flex justify-content-center mb-5 flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.label}
                  variant={
                    selectedPriceRange === range.label
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handlePriceChange(range.label)}
                  className="rounded-pill"
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* 🛍 Grouped Display by Category */}
            {Object.keys(groupedProducts).length === 0 ? (
              <p className="text-center text-muted">No products found.</p>
            ) : (
              Object.entries(groupedProducts).map(([category, items]) => (
                <div key={category} className="mb-5">
                  <h4 className="fw-bold mb-3 text-capitalize border-bottom pb-2">
                    {category}
                  </h4>
                  <Row className="gx-4 gy-4">
                    {items.map((product) => (
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
              ))
            )}
          </>
        )}
      </Container>
    </>
  );
}
