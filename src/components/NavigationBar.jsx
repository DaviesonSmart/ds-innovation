// src/components/Navbar.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Badge,
  Offcanvas,
  NavDropdown,
  Collapse,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingBag,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseHelpers";
import { collection, getDocs } from "firebase/firestore";

export default function NavigationBar() {
  const { cartItems = [] } = useContext(CartContext);
  const { wishlistItems = [] } = useContext(WishlistContext);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showShopDropdown, setShowShopDropdown] = useState(false);

  const toggleOffcanvas = () => setShow((prev) => !prev);
  const toggleShopDropdown = () => setShowShopDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/shop");
    }
    setShow(false);
    setSearchTerm("");
  };

  // ✅ Fetch unique categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => doc.data());
        const unique = [
          ...new Set(
            products.map((p) => p.category?.trim()).filter((c) => c && c !== "")
          ),
        ];
        setCategories(unique);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const isAdmin = user?.role === "admin";
  if (loading) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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

            {/* ✅ Mobile search */}
            <AnimatePresence>
              <motion.div
                className="d-lg-none flex-grow-1 mx-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">
                    <FaSearch />
                  </Button>
                </Form>
              </motion.div>
            </AnimatePresence>

            {/* ✅ Mobile toggle */}
            <Button
              variant="outline-light"
              className="d-lg-none ms-2"
              onClick={toggleOffcanvas}
            >
              <FaBars />
            </Button>

            {/* ✅ Desktop menu */}
            <Navbar.Collapse className="justify-content-between d-none d-lg-flex">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/" end>
                  Home
                </Nav.Link>

                {/* 🛍 Shop dropdown */}
                <NavDropdown title="Shop" id="shop-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate("/shop")}
                    className="fw-semibold"
                  >
                    All Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <NavDropdown.Item
                        key={cat}
                        onClick={() =>
                          navigate(`/shop?category=${encodeURIComponent(cat)}`)
                        }
                      >
                        {cat}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item disabled>No categories</NavDropdown.Item>
                  )}
                </NavDropdown>

                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
              </Nav>

              {/* ✅ Desktop search */}
              <Form
                className="d-flex mx-auto"
                style={{ flexGrow: 1, minWidth: "220px", maxWidth: "600px" }}
                onSubmit={handleSearch}
              >
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline-light">
                  <FaSearch />
                </Button>
              </Form>

              {/* ✅ Right icons */}
              <Nav className="align-items-center">
                <Nav.Link as={NavLink} to="/cart" className="position-relative">
                  <FaShoppingCart size={22} />
                  {cartItems.length > 0 && (
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
                  {wishlistItems.length > 0 && (
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

      {/* ✅ Mobile Offcanvas menu */}
      <Offcanvas show={show} onHide={toggleOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold fs-4">
            SmartTech ✨
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ✅ Search inside offcanvas */}
          <Form className="d-flex mb-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-dark">
              <FaSearch />
            </Button>
          </Form>

          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={toggleOffcanvas}>
              <FaHome /> Home
            </Nav.Link>

            {/* 🛍 Improved dropdown toggle */}
            <div>
              <Button
                variant="outline-dark"
                className="w-100 d-flex justify-content-between align-items-center mb-2"
                onClick={toggleShopDropdown}
                aria-expanded={showShopDropdown}
              >
                <span>
                  <FaShoppingBag /> Shop
                </span>
                {showShopDropdown ? <FaChevronUp /> : <FaChevronDown />}
              </Button>

              <Collapse in={showShopDropdown}>
                <div>
                  <Button
                    variant="link"
                    className="text-start w-100 text-dark fw-semibold"
                    onClick={() => {
                      navigate("/shop");
                      toggleOffcanvas();
                    }}
                  >
                    All Products
                  </Button>

                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Button
                        key={cat}
                        variant="link"
                        className="text-start w-100 text-capitalize text-dark"
                        onClick={() => {
                          navigate(`/shop?category=${encodeURIComponent(cat)}`);
                          toggleOffcanvas();
                        }}
                      >
                        {cat}
                      </Button>
                    ))
                  ) : (
                    <p className="ps-3 text-muted small mb-2">
                      No categories found
                    </p>
                  )}
                </div>
              </Collapse>
            </div>

            <Nav.Link as={NavLink} to="/about" onClick={toggleOffcanvas}>
              <FaInfoCircle /> About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={toggleOffcanvas}>
              <FaEnvelope /> Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" onClick={toggleOffcanvas}>
              <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wishlist" onClick={toggleOffcanvas}>
              <FaHeart /> Wishlist
            </Nav.Link>

            <hr />

            {user ? (
              <>
                <div className="fw-semibold mb-2 text-muted">
                  {user.displayName || user.email}
                </div>
                <Button
                  variant="outline-dark"
                  className="w-100 mb-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
                {isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    className="text-warning fw-bold"
                  >
                    <FaUserCog /> Admin
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={toggleOffcanvas}>
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" onClick={toggleOffcanvas}>
                  <FaUserPlus /> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
