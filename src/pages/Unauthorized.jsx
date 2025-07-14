// src/pages/Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function Unauthorized() {
  return (
    <Container className="text-center py-5">
      <h2 className="text-danger fw-bold">🚫 Unauthorized Access</h2>
      <p>You are not allowed to view this page.</p>
      <Link to="/">
        <Button variant="dark" className="mt-3 rounded-pill">
          Go to Home
        </Button>
      </Link>
    </Container>
  );
}
