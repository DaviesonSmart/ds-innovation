import React, { useContext, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Badge,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NavigationBar() {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.length;
  const [show, setShow] = useState(false);

  const toggleOffcanvas = () => setShow(!show);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          fixed="top"
          className="shadow-sm py-3"
          style={{ zIndex: 1030 }}
        >
          <Container>
            {/* Brand */}
            <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 brand-text">
              Smart<span className="highlight">Tech</span> 👗
            </Navbar.Brand>

            {/* Mobile Toggle */}
            <Button
              variant="outline-light"
              className="d-lg-none"
              onClick={toggleOffcanvas}
            >
              <FaBars />
            </Button>

            {/* Desktop Menu */}
            <Navbar.Collapse className="justify-content-between d-none d-lg-flex">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="text-light px-3">
                  Home
                </Nav.Link>

                <NavDropdown
                  title="Shop"
                  id="shop-dropdown"
                  className="text-light px-3"
                >
                  <NavDropdown.Item as={Link} to="/shop">
                    All Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/shop/gowns">
                    Gowns
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/shop/skirts">
                    Skirts
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/shop/tops">
                    Tops
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/shop/joggers">
                    Joggers
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/about" className="text-light px-3">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="text-light px-3">
                  Contact
                </Nav.Link>
              </Nav>

              <Form className="d-flex me-3" role="search">
                <Form.Control
                  type="search"
                  id="search-input"
                  name="search"
                  placeholder="Search products..."
                  className="me-2 rounded-pill"
                  aria-label="Search products"
                  autoComplete="off"
                />
                <Button
                  variant="outline-light"
                  type="submit"
                  className="rounded-pill px-3"
                  aria-label="Submit search"
                >
                  <FaSearch />
                </Button>
              </Form>

              <Nav className="align-items-center">
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="position-relative text-light"
                >
                  <FaShoppingCart size={22} />
                  {cartCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link as={Link} to="/login" className="text-light px-2">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-light px-2">
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.nav>

      {/* Offcanvas Menu for Mobile */}
      <Offcanvas show={show} onHide={toggleOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SmartTech Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={toggleOffcanvas}>
              Home
            </Nav.Link>
            <NavDropdown title="Shop" id="offcanvas-shop-dropdown">
              <NavDropdown.Item as={Link} to="/shop" onClick={toggleOffcanvas}>
                All Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/shop/gowns"
                onClick={toggleOffcanvas}
              >
                Gowns
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/shop/skirts"
                onClick={toggleOffcanvas}
              >
                Skirts
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/shop/tops"
                onClick={toggleOffcanvas}
              >
                Tops
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/shop/joggers"
                onClick={toggleOffcanvas}
              >
                Joggers
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about" onClick={toggleOffcanvas}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={toggleOffcanvas}>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={toggleOffcanvas}>
              Cart ({cartCount})
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={toggleOffcanvas}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" onClick={toggleOffcanvas}>
              Register
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
