// src/pages/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Card,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseHelpers";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ For editing modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  // ✅ Real-time Firestore listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    await deleteDoc(doc(db, "products", id));
  };

  // ✅ Open edit modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
    });
    setShowModal(true);
  };

  // ✅ Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update Firestore
  const handleUpdate = async () => {
    if (!selectedProduct) return;

    const productRef = doc(db, "products", selectedProduct.id);
    await updateDoc(productRef, {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
    });

    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <Container>
        <h2 className="mb-4">🛍️ Manage Products</h2>

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
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
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

      {/* 🧾 Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₦)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}
