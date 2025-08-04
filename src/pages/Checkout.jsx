import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import emailjs from "emailjs-com";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const qty = item.quantity || 1;
      return total + price * qty;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      ...form,
      cart: cartItems,
      total: calculateTotal(),
      status: "Pending",
      date: new Date().toISOString(),
    };

    // Save to localStorage
    const existingOrders =
      JSON.parse(localStorage.getItem("smarttech-orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("smarttech-orders", JSON.stringify(updatedOrders));
    localStorage.setItem("smarttech-latest-order", JSON.stringify(newOrder));

    // Send Email with EmailJS
    const templateParams = {
      user_name: form.name,
      user_email: form.email, // ✅ must match the variable in your EmailJS template
      user_address: form.address,
      payment_method: form.payment,
      order_total: newOrder.total,
      order_items: cartItems
        .map((item) => `${item.name} x${item.quantity || 1}`)
        .join(", "),
    };

    emailjs
      .send(
        "service_k6i5nf9", // ✅ Your EmailJS Service ID
        "template_eiyfbib", // ✅ Your EmailJS Template ID
        templateParams,
        "XnyElvWzPmfiuzilU" // ✅ Your EmailJS Public Key
      )
      .then(() => {
        console.log("✅ Email sent!");
        clearCart();
        navigate("/order-confirmation");
      })
      .catch((err) => {
        console.error("❌ Failed to send email:", err);
        alert("Email failed: " + err.text); // optional fallback
      });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-center mb-4">Checkout</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your delivery address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <div className="ps-2">
                    <Form.Check
                      type="radio"
                      label="Pay on Delivery"
                      name="payment"
                      value="Pay on Delivery"
                      onChange={handleChange}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Bank Transfer"
                      name="payment"
                      value="Bank Transfer"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100 mt-3">
                  Place Order
                </Button>
              </Form>

              <hr />
              <h5 className="text-end">
                Total: ₦{calculateTotal().toLocaleString()}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
