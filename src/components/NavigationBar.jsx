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
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext"; // ✅ Correct path

import { signOut } from "firebase/auth";
import { auth } from "../firebaseHelpers";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { cartItems = [] } = useContext(CartContext);
  const { wishlistItems = [] } = useContext(WishlistContext);
  const { user, loading } = useAuth();

  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => setShow(!show);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = user?.email === "admin@smarttech.com";

  if (loading) return null;

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
        >
          <Container>
            <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
              Smart<span className="text-primary">Tech</span> 👗
            </Navbar.Brand>

            <Button
              variant="outline-light"
              className="d-lg-none ms-auto"
              onClick={toggleOffcanvas}
            >
              <FaBars />
            </Button>

            <Navbar.Collapse className="justify-content-between d-none d-lg-flex">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/" end>
                  Home
                </Nav.Link>

                <NavDropdown title="Shop" id="shop-dropdown">
                  <NavDropdown.Item as={NavLink} to="/shop">
                    All Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/shop/gowns">
                    Gowns
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/shop/skirts">
                    Skirts
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/shop/tops">
                    Tops
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/shop/joggers">
                    Joggers
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
              </Nav>

              <Form className="d-flex me-3">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="me-2 rounded-pill"
                />
                <Button variant="outline-light" className="rounded-pill px-3">
                  <FaSearch />
                </Button>
              </Form>

              <Nav className="align-items-center">
                <Nav.Link as={NavLink} to="/cart" className="position-relative">
                  <FaShoppingCart size={22} />
                  {Array.isArray(cartItems) && cartItems.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/wishlist"
                  className="position-relative"
                >
                  <FaHeart size={22} />
                  {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Nav.Link>

                {user ? (
                  <>
                    <span className="text-light px-2">
                      {user.displayName || user.email}
                    </span>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    {isAdmin && (
                      <Nav.Link
                        as={NavLink}
                        to="/admin"
                        className="text-warning fw-bold px-3"
                      >
                        Admin
                      </Nav.Link>
                    )}
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register">
                      Register
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.nav>

      {/* ✅ Mobile Offcanvas */}
      <Offcanvas show={show} onHide={toggleOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SmartTech Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={toggleOffcanvas}>
              Home
            </Nav.Link>

            <NavDropdown title="Shop" id="mobile-shop-dropdown">
              <NavDropdown.Item
                as={NavLink}
                to="/shop"
                onClick={toggleOffcanvas}
              >
                All Products
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/shop/gowns"
                onClick={toggleOffcanvas}
              >
                Gowns
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/shop/skirts"
                onClick={toggleOffcanvas}
              >
                Skirts
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/shop/tops"
                onClick={toggleOffcanvas}
              >
                Tops
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/shop/joggers"
                onClick={toggleOffcanvas}
              >
                Joggers
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/about" onClick={toggleOffcanvas}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={toggleOffcanvas}>
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" onClick={toggleOffcanvas}>
              Cart ({cartItems.length})
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wishlist" onClick={toggleOffcanvas}>
              Wishlist ({wishlistItems.length})
            </Nav.Link>

            {user ? (
              <>
                <span className="px-3 py-2">
                  {user.displayName || user.email}
                </span>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="ms-3 my-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                {isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    onClick={toggleOffcanvas}
                    className="text-warning fw-bold"
                  >
                    Admin
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={toggleOffcanvas}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" onClick={toggleOffcanvas}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
