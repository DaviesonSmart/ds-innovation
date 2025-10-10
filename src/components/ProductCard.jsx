// src/components/ProductCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../contexts/WishlistContext";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

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
      {/* ✅ Wrap image with Link to product details */}
      <Link to={`/product/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.image || product.images?.[0]}
          alt={product.name || "Product"}
          style={{
            aspectRatio: "4 / 5", // typical fashion product ratio
            objectFit: "cover",
            width: "100%",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/fallback.jpg";
          }}
        />
      </Link>

      {/* Wishlist Button */}
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
          {/* ✅ Wrap title with Link to product details */}
          <Card.Title className="fw-bold">
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </Card.Title>
          <Card.Text className="text-muted">
            ₦{Number(product?.price || 0).toLocaleString()}
          </Card.Text>
        </div>
        <Button
          variant="dark"
          className="mt-3 rounded-pill"
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
