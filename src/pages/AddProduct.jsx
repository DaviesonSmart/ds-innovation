// src/pages/AddProduct.jsx
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
  const [imageFiles, setImageFiles] = useState([]); // multiple images
  const [uploadProgress, setUploadProgress] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // FileList → Array
  };

  // Upload a single file to Cloudinary
  const uploadToCloudinary = async (file, index) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "smart_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dyrvraklf/image/upload",
        data,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              [index]: progress,
            }));
          },
        }
      );
      return res.data.secure_url;
    } catch (err) {
      console.error(
        "Cloudinary Upload Error:",
        err.response?.data || err.message
      );
      toast.error(`❌ Failed to upload ${file.name}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, description } = form;

    if (!name || !price || !category || !description || !imageFiles.length) {
      toast.error("Please fill in all fields and upload images");
      return;
    }

    try {
      // Upload all images
      const uploadedUrls = await Promise.all(
        imageFiles.map((file, i) => uploadToCloudinary(file, i))
      );

      // Filter out any nulls (failed uploads)
      const imageUrls = uploadedUrls.filter(Boolean);

      if (!imageUrls.length) {
        toast.error("❌ No images uploaded");
        return;
      }

      // Save product in Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        category,
        description,
        images: imageUrls, // clean array of URLs
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
                  <Form.Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option value="Dresses">Gowns</option>
                    <option value="Tops">Two Piece Sets</option>
                    <option value="Bottoms">Tops & Blouses</option>
                    <option value="Two-Piece">Skirts</option>
                    <option value="Outerwear">Jumpsuits</option>
                    <option value="Outerwear">Jeans</option>
                    <option value="Outerwear">Shorts</option>
                    <option value="Outerwear">Crop Tops</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Product Images</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                {/* Show progress for each file */}
                {imageFiles.map((file, i) => (
                  <div key={i} className="mb-2">
                    <small>{file.name}</small>
                    <ProgressBar
                      now={uploadProgress[i] || 0}
                      label={`${uploadProgress[i] || 0}%`}
                    />
                  </div>
                ))}

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
