// src/components/ProductCard.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../contexts/WishlistContext";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  if (!product) return null;

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

  // ✅ Category click navigation
  const handleCategoryClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.category) {
      navigate(`/shop?category=${encodeURIComponent(product.category)}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 position-relative">
      {/* ✅ Product Image */}
      <Link to={`/product/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.image || product.images?.[0]}
          alt={product.name || "Product"}
          style={{
            aspectRatio: "4 / 5",
            objectFit: "cover",
            width: "100%",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/fallback.jpg";
          }}
        />
      </Link>

      {/* ❤️ Wishlist Icon */}
      <Button
        variant="outline-danger"
        className="rounded-circle position-absolute top-0 end-0 m-2"
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </Button>

      {/* ✅ Product Info */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          {/* 🏷️ Clickable Category */}
          {product.category && (
            <small
              className="text-muted text-uppercase fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleCategoryClick}
            >
              {product.category}
            </small>
          )}

          {/* 🧢 Product Name */}
          <Card.Title className="fw-bold mt-1">
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </Card.Title>

          {/* 💰 Product Price */}
          <Card.Text className="text-muted mb-2">
            ₦{Number(product?.price || 0).toLocaleString()}
          </Card.Text>
        </div>

        {/* 🛒 Add to Cart */}
        <Button
          variant="dark"
          className="mt-2 rounded-pill"
          onClick={() => {
            addToCart(product);
            toast.success("Added to cart! 🛒");
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
