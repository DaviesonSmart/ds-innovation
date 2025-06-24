import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (!Array.isArray(cartItems)) {
    return <p className="text-center">Cart is unavailable.</p>;
  }

  const total = cartItems.reduce((acc, item) => acc + (item?.price || 0), 0);

  return (
    <>
      <NavigationBar />
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
                      <Card.Text>₦{item?.price?.toLocaleString()}</Card.Text>
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
              <Button variant="success">Proceed to Checkout</Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
