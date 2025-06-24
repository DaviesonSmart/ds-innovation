// src/components/ProductCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext"; // ✅ Make sure this path is correct

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // ✅ Get addToCart from context

  if (!product) return null;

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name || "Product"}
        style={{ height: "250px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/fallback.jpg"; // optional fallback image
        }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold">{product.name}</Card.Title>
          <Card.Text className="text-muted">
            ₦{product.price.toLocaleString()}
          </Card.Text>
        </div>
        <Button
          variant="dark"
          className="mt-3 rounded-pill"
          onClick={() => addToCart(product)} // ✅ Add to cart on click
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
