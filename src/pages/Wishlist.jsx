import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success("Moved to cart 🛒");
  };

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your wishlist is empty 😢</h3>
        <p>Browse products and click 💖 to save them here.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5 px-2 px-sm-3 px-md-4">
      <h3 className="mb-4 text-center">Your Wishlist 💖</h3>
      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-3">
        {wishlistItems.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              {/* Image goes here */}
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="w-100 d-block"
                style={{
                  aspectRatio: "4 / 5", // ✅ Keeps ratio locked
                  objectFit: "cover",
                }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>₦{product.price.toLocaleString()}</Card.Text>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    variant="dark"
                    onClick={() => handleAddToCart(product)} // 👈 this will move it to cart and toast
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => removeFromWishlist(product.id)} // 👈 this is the missing magic
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
