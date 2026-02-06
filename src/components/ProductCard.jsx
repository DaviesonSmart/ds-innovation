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

  const handleCategoryClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.category) {
      navigate(`/shop?category=${encodeURIComponent(product.category)}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Card className="product-card shadow-sm border-0 rounded-4 position-relative h-100">
      {/* 🖼️ Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="product-img-wrapper">
          <Card.Img
            variant="top"
            src={product.image || product.images?.[0]}
            alt={product.name || "Product"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/fallback.jpg";
            }}
          />
        </div>
      </Link>

      {/* ❤️ Wishlist Icon */}
      <Button
        variant="outline-danger"
        className="wishlist-btn rounded-circle position-absolute top-0 end-0 m-2"
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </Button>

      {/* 🛍️ Product Info */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          {product.category && (
            <small
              className="text-muted text-uppercase fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleCategoryClick}
            >
              {product.category}
            </small>
          )}

          <Card.Title className="fw-bold mt-1">
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </Card.Title>

          <Card.Text className="text-muted mb-2">
            ₦{Number(product?.price || 0).toLocaleString()}
          </Card.Text>
        </div>

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
