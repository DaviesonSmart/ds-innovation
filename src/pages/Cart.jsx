import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { user, checkingStatus } = useAuth();

  // ✅ 1. Show loading until Firebase finishes checking
  if (checkingStatus) {
    return <p className="text-center mt-5">Checking login status...</p>;
  }

  // ✅ 2. Block access if not logged in
  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h3>Please log in to view your cart</h3>
        <Link to="/login" className="btn btn-primary mt-3">
          Go to Login
        </Link>
      </Container>
    );
  }

  // ✅ 3. Handle when cart is unavailable
  if (!Array.isArray(cartItems)) {
    return <p className="text-center mt-5">Cart is unavailable.</p>;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + (item?.price || 0) * (item?.quantity || 1),
    0
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">🛍️ Your cart is empty.</p>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((item, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item?.image || "https://via.placeholder.com/150"}
                  />
                  <Card.Body>
                    <Card.Title>{item?.name}</Card.Title>
                    <Card.Text>
                      ₦{item?.price?.toLocaleString()} × {item?.quantity}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFromCart(item?.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-end mt-4">
            <h4>Total: ₦{total.toLocaleString()}</h4>
            <Link to="/checkout" className="btn btn-success">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}
