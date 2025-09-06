import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";
import { db } from "../firebaseHelpers";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

const uploadToCloudinary = async () => {
  if (!imageFile) return null;

  const data = new FormData();
  data.append("file", imageFile);
  data.append("upload_preset", "smart_preset"); // must match your Cloudinary unsigned preset name

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dyrvraklf/image/upload",
      data,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      }
    );
    return res.data.secure_url;
  } catch (err) {
    console.error(
      "Cloudinary Upload Error:",
      err.response?.data || err.message
    );
    toast.error("❌ Image upload failed");
    return null;
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, description } = form;

    if (!name || !price || !category || !description || !imageFile) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // 🔼 Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary();
      if (!imageUrl) return;

      // ✅ Save product in Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        category,
        description,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      toast.success("🎉 Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Firestore Add Error:", error);
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
                  <Form.Label>Upload Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                {uploadProgress > 0 && (
                  <ProgressBar
                    now={uploadProgress}
                    label={`${uploadProgress}%`}
                    className="mb-3"
                  />
                )}

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
