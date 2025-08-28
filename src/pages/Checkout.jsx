import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import emailjs from "emailjs-com";
import { usePaystackPayment } from "react-paystack";
import { db } from "../firebaseHelpers"; // ✅ your firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

 const calculateTotal = () => {
   return cartItems.reduce((total, item) => {
     const price = parseFloat(item.price) || 0;
     const qty = parseInt(item.quantity) || 1;
     return total + price * qty;
   }, 0);
 };

  const totalAmount = calculateTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: form.email,
    amount: totalAmount * 100,
    publicKey: "pk_test_b8a9325c39746dc553bdabcdcef82973d11f1430",
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const saveOrderToFirestore = async (orderData) => {
    try {
      await addDoc(collection(db, "orders"), {
        ...orderData,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Order saved to Firestore");
    } catch (error) {
      console.error("❌ Firestore error:", error);
    }
  };

  const processOrder = async (status, paymentRef = null) => {
    const newOrder = {
      ...form,
      cart: cartItems,
      total: totalAmount,
      status,
      paymentRef,
      date: new Date().toISOString(),
    };

    // Save to localStorage (backup)
    const existingOrders =
      JSON.parse(localStorage.getItem("smarttech-orders")) || [];
    localStorage.setItem(
      "smarttech-orders",
      JSON.stringify([...existingOrders, newOrder])
    );
    localStorage.setItem("smarttech-latest-order", JSON.stringify(newOrder));

    // Save to Firestore
    await saveOrderToFirestore(newOrder);

    // Send Email via EmailJS
    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      user_address: form.address,
      payment_method: form.payment,
      order_total: newOrder.total,
      order_items: cartItems
        .map((item) => `${item.name} x${item.quantity || 1}`)
        .join(", "),
    };

    emailjs
      .send(
        "service_k6i5nf9",
        "template_eiyfbib",
        templateParams,
        "XnyElvWzPmfiuzilU"
      )
      .then(() => {
        console.log("✅ Email sent!");
        clearCart();
        navigate("/order-confirmation");
      })
      .catch((err) => {
        console.error("❌ Email failed:", err);
      });
  };

  const handlePaymentSuccess = (reference) => {
    console.log("✅ Payment successful:", reference);
    processOrder("Paid", reference.reference);
  };

  const handlePaymentClose = () => {
    console.log("❌ Payment popup closed by user");
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.email || !form.email.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  if (totalAmount <= 0) {
    alert("Your cart is empty or total is invalid");
    return;
  }

  if (form.payment === "Paystack Online Payment") {
    initializePayment(handlePaymentSuccess, handlePaymentClose);
  } else {
    processOrder("Pending");
  }
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
                    <Form.Check
                      type="radio"
                      label="Paystack Online Payment"
                      name="payment"
                      value="Paystack Online Payment"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100 mt-3">
                  {form.payment === "Paystack Online Payment"
                    ? "Pay with Paystack"
                    : "Place Order"}
                </Button>
              </Form>

              <hr />
              <h5 className="text-end">
                Total: ₦{totalAmount.toLocaleString()}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
