import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";
import { addProductToFirebase } from "../firebaseHelpers";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category, description, image } = form;

    if (!name || !price || !category || !description || !image) {
      toast.error("Please fill in all fields");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      description,
      image,
      createdAt: new Date(),
    };

    try {
      await addProductToFirebase(newProduct);
      toast.success("🎉 Product added to Firebase!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Firebase Add Error:", error);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-sm border-0">
              <h3 className="mb-4 text-center">➕ Add New Product</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Black Maxi Gown"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price (₦)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 9500"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g. Gowns, Leggings, Crop Tops"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://your-image-url.jpg"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Product description"
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                  Save Product
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
}
