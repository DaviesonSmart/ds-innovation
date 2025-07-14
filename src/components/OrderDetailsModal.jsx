// src/components/OrderDetailsModal.jsx
import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function OrderDetailsModal({ show, onHide, order }) {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details - #{order.id || "N/A"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Customer Info</h5>
        <p>
          <strong>Name:</strong> {order.name} <br />
          <strong>Email:</strong> {order.email} <br />
          <strong>Address:</strong> {order.address} <br />
          <strong>Payment:</strong> {order.payment}
        </p>

        <h5>Items</h5>
        <Table bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>₦{item.price?.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>₦{(item.price * item.quantity)?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5 className="text-end mt-4">
          Total: <strong>₦{order.total?.toLocaleString()}</strong>
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
