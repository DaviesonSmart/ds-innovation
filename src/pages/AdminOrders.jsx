import React, { useState, useEffect } from "react";
import { Card, Table, Container, Button, Badge } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import OrderDetailsModal from "../components/OrderDetailsModal";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteOrder = (indexToDelete) => {
    const filteredOrders = orders.filter((_, i) => i !== indexToDelete);
    setOrders(filteredOrders);
    localStorage.setItem("smarttech-orders", JSON.stringify(filteredOrders));
  };
  

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("smarttech-orders")) || [];
    setOrders(stored);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem("smarttech-orders", JSON.stringify(updated));
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <Container>
        <h2 className="mb-4">🧾 All Orders</h2>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders
                    .slice()
                    .reverse()
                    .map((order, i) => {
                      const index = orders.length - 1 - i;
                      return (
                        <tr key={index}>
                          <td>{i + 1}</td>
                          <td>{order.name}</td>
                          <td>{order.email}</td>
                          <td>{order.payment}</td>
                          <td>₦{order.total?.toLocaleString()}</td>
                          <td>
                            <Badge
                              bg={
                                order.status === "Completed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                          <td className="d-flex flex-column gap-2">
                            {order.status === "Pending" ? (
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => updateStatus(index, "Completed")}
                              >
                                Mark as Done
                              </Button>
                            ) : (
                              <span className="text-muted">✓ Done</span>
                            )}

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDeleteOrder(index)}
                            >
                              Delete
                            </Button>

                            <Button
                              variant="outline-dark"
                              size="sm"
                              onClick={() => handleViewDetails(order)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ✅ Order Modal */}
        <OrderDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          order={selectedOrder}
        />
      </Container>
    </AdminLayout>
  );
}
