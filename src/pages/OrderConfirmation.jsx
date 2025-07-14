import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js"; // ✅ Only if installed via npm

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const receiptRef = useRef();

  useEffect(() => {
    const latest = localStorage.getItem("smarttech-latest-order");
    if (latest) {
      setOrder(JSON.parse(latest));
    }
  }, []);

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <h3 className="fw-bold">No Order Found 😢</h3>
        <p>Please go to the shop and place an order first.</p>
        <Button
          as={Link}
          to="/shop"
          variant="dark"
          className="rounded-pill mt-3"
        >
          Back to Shop
        </Button>
      </Container>
    );
  }

  const formattedDate = new Date(order.date).toLocaleString();
  const deliveryDate = new Date(
    new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000
  ).toDateString(); // Adds 3 days

  const handleDownloadReceipt = () => {
    html2pdf()
      .set({
        margin: 0.5,
        filename: "SmartTech_Receipt.pdf",
        html2canvas: { scale: 2 },
      })
      .from(receiptRef.current)
      .save();
  };

  return (
    <Container className="py-5">
      <Card className="p-4 border-0 shadow-lg rounded-4" ref={receiptRef}>
        <div className="text-center mb-4">
          <img
            src="/logo.png" // 🔁 Replace this with your actual logo path
            alt="SmartTech Collections"
            style={{ maxHeight: "60px" }}
          />
          <h6 className="mt-2">
            Receipt #: ST-{Date.now().toString().slice(-6)}
          </h6>
        </div>

        {/* 🎉 Confirmation Title */}
        <h2 className="text-center fw-bold text-success mb-4">
          🎉 Order Placed Successfully!
        </h2>

        <p className="text-muted text-center mb-4">
          Thank you <strong>{order.name}</strong> for shopping with{" "}
          <strong>SmartTech Collections</strong>!
        </p>

        <Row className="mb-4">
          <Col md={6}>
            <h5 className="fw-semibold">🧍 Customer Info</h5>
            <p>
              <strong>Name:</strong> {order.name} <br />
              <strong>Email:</strong> {order.email} <br />
              <strong>Payment:</strong> {order.payment}
            </p>
          </Col>
          <Col md={6}>
            <h5 className="fw-semibold">📦 Delivery Info</h5>
            <p>
              <strong>Address:</strong> <br />
              {order.address}
              <br />
              <strong>Order Date:</strong> {formattedDate} <br />
              <strong>Estimated Delivery:</strong> {deliveryDate}
            </p>
          </Col>
        </Row>

        <h5 className="fw-semibold mb-3">🧾 Order Summary</h5>
        <Table responsive bordered hover className="mb-4">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.cart.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity || 1}</td>
                <td>₦{item.price.toLocaleString()}</td>
                <td>₦{(item.price * (item.quantity || 1)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end">
          <h5>
            Total: <strong>₦{order.total.toLocaleString()}</strong>
          </h5>
        </div>
      </Card>

      <div className="text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <Button
          onClick={handleDownloadReceipt}
          variant="outline-success"
          className="rounded-pill px-4"
        >
          📄 Download Receipt
        </Button>

        <Button
          as={Link}
          to="/shop"
          variant="dark"
          className="rounded-pill px-4"
        >
          🛒 Continue Shopping
        </Button>
      </div>
    </Container>
  );
}
