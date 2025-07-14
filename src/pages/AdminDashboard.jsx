import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("smarttech-users")) || [];
    setUsers(storedUsers);
  }, []);

  const orders = JSON.parse(localStorage.getItem("smarttech-orders")) || [];
  const wishlistCount =
    JSON.parse(localStorage.getItem("smarttech-wishlist"))?.length || 0;

  return (
    <AdminLayout>
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Total Orders</h5>
              <h2>{orders.length}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Total Users</h5>

              <h2>{users.length}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Revenue</h5>
              <h2>
                ₦
                {orders
                  .reduce((acc, order) => acc + (order.total || 0), 0)
                  .toLocaleString()}
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Wishlist Items</h5>
              <h2>{wishlistCount}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Table */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3">📦 Recent Orders</h5>
          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.name || "Guest"}</td>
                      <td>{order.email || "N/A"}</td>
                      <td>₦{order.total?.toLocaleString() || 0}</td>
                      <td>
                        {new Date(
                          order.date || Date.now()
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </Table>

          {/* View All Orders Button */}
          <div className="text-end mt-3">
            <Link to="/admin/orders" className="btn btn-outline-primary">
              View All Orders
            </Link>
          </div>
          <div className="text-end mt-3">
            <Link to="/admin/users" className="btn btn-outline-dark mt-2">
              View Users
            </Link>
            <Link to="/admin/products" className="btn btn-outline-dark mt-2">
              Manage Products
            </Link>
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}
