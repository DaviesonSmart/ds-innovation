import React, { useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_k6i5nf9", // 👉 Replace with your EmailJS Service ID
        "template_sukugb9", // 👉 Replace with your Template ID
        form.current,
        "0Au38IIit_26ERhl2" // 👉 Replace with your Public Key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Message failed to send, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <>
      <NavigationBar />
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold">Contact Us</h2>
        <Row className="g-4">
          <Col md={6}>
            <h5>Get in Touch</h5>
            <p>
              If you have any questions or feedback, we’d love to hear from you.
            </p>
            <p>
              <strong>Email:</strong> support@smarttechcollections.com
            </p>
            <p>
              <strong>Phone:</strong> +234 000 000 0000
            </p>
            <p>
              <strong>Location:</strong> Lagos, Nigeria
            </p>
          </Col>
          <Col md={6}>
            <h5>Send Us a Message</h5>
            <Form ref={form} onSubmit={sendEmail}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="user_name">Full Name</Form.Label>
                <Form.Control
                  id="user_name"
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="user_email">Email Address</Form.Label>
                <Form.Control
                  id="user_email"
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="message">Message</Form.Label>
                <Form.Control
                  id="message"
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Type your message"
                  required
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="rounded-pill px-4"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
