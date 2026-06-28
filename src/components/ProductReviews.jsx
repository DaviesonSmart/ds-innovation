import React, { useState, useEffect } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseHelpers";
import { toast } from "react-toastify";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("productId", "==", productId),
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !comment) {
      return toast.error("Fill all fields");
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId,
        name,
        comment,
        rating,
        createdAt: serverTimestamp(),
      });

      toast.success("Review submitted");

      setName("");
      setComment("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-5">
      <h3 className="fw-bold mb-4">Customer Reviews ({reviews.length})</h3>

      <Card className="p-4 mb-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={1}>★☆☆☆☆</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="dark">
            Submit Review
          </Button>
        </Form>
      </Card>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="mb-3 p-3">
            <h6 className="fw-bold">{review.name}</h6>

            <div className="text-warning mb-2">{"★".repeat(review.rating)}</div>

            <p className="mb-0">{review.comment}</p>
          </Card>
        ))
      )}
    </div>
  );
}
