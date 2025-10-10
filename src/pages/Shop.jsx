// src/pages/Shop.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { db } from "../firebaseHelpers";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

// Price ranges (same as ProductList)
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₦10,000", min: 0, max: 9999 },
  { label: "₦10,000 – ₦12,000", min: 10000, max: 12000 },
  { label: "Above ₦12,000", min: 12001, max: Infinity },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "All";

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

  // ✅ Dynamic categories from Firestore
  const categories = useMemo(() => {
    if (!products.length) return ["All"];
    const cats = products.map((p) => p.category?.trim()).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  // ✅ Filter by category if query param is present
  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return products;
    }

    return products.filter(
      (p) =>
        p?.category?.toLowerCase().trim() ===
        selectedCategory.toLowerCase().trim()
    );
  }, [products, selectedCategory]);

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
          {selectedCategory === "All"
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
            {/* Category Filter */}
            <div className="d-flex justify-content-center mb-3 flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "dark" : "outline-dark"}
                  onClick={() =>
                    navigate(
                      cat === "All"
                        ? "/shop"
                        : `/shop?category=${encodeURIComponent(cat)}`
                    )
                  }
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

            {/* Product Grid */}
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
