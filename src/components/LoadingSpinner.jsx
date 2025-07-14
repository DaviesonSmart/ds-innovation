import React from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function LoadingSpinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <Spinner animation="border" variant="dark" role="status" />
    </div>
  );
}
