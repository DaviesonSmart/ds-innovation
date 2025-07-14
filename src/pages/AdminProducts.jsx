import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("smarttech-products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("smarttech-products", JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <Container>
        <h2 className="mb-4">🛍️ All Products</h2>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="mb-3 text-end">
              <Link to="/admin/add-product" className="btn btn-dark">
                ➕ Add New Product
              </Link>
            </div>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price (₦)</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          width="60"
                          height="60"
                          style={{ objectFit: "cover" }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price.toLocaleString()}</td>
                      <td>{product.category}</td>
                      <td>
                        {/* Edit can come later */}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </td>
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
