// src/components/ProductCard.jsx
import React from "react";
import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../contexts/WishlistContext";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext"; // ✅ Make sure this path is correct
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // ✅ Get addToCart from context

  if (!product) return null;

  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist 💔");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist 💖");
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 position-relative">
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

      <Button
        variant="outline-danger"
        className="rounded-circle position-absolute top-0 end-0 m-2"
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </Button>

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
          onClick={() => {
            addToCart(product); // ✅ Your cart logic
            toast.success("Added to cart! 🛒"); // 🔔 User feedback
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
