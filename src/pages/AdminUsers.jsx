import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Table, Card, Container } from "react-bootstrap";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("smarttech-users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <AdminLayout>
      <Container>
        <h2 className="mb-4">👥 Registered Users</h2>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th> {/* You can hide this later */}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
}
