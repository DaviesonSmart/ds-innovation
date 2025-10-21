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
  const [searchTerm, setSearchTerm] = useState(""); // ✅ unified search
  const toggleOffcanvas = () => setShow(!show);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ✅ Handle search for all (desktop, mobile, offcanvas)
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
      setShow(false); // close offcanvas if open
      setSearchTerm("");
    } else {
      navigate("/shop");
    }
  };

  // ✅ Fetch categories dynamically from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productData = querySnapshot.docs.map((doc) => doc.data());
        const uniqueCategories = [
          ...new Set(
            productData
              .map((p) => p.category?.trim())
              .filter((c) => c && c !== "")
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const isAdmin = user?.role === "admin";
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

            {/* ✅ Mobile Search Bar */}
            <AnimatePresence>
              <motion.div
                className="d-lg-none flex-grow-1 mx-2"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search products..."
                    className="me-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">
                    <FaSearch />
                  </Button>
                </Form>
              </motion.div>
            </AnimatePresence>

            {/* ✅ Mobile Toggle */}
            <Button
              variant="outline-light"
              className="d-lg-none ms-2"
              onClick={toggleOffcanvas}
            >
              <FaBars />
            </Button>

            {/* ✅ Desktop Menu */}
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
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <NavDropdown.Item
                        key={category}
                        as={NavLink}
                        to={`/shop?category=${encodeURIComponent(category)}`}
                      >
                        {category}
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

              {/* ✅ Desktop Search */}
              <Form
                className="d-flex mx-auto my-2 my-lg-0"
                style={{ flexGrow: 1, minWidth: "220px", maxWidth: "600px" }}
                onSubmit={handleSearch}
              >
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="outline-light"
                  className="rounded-pill px-3"
                >
                  <FaSearch />
                </Button>
              </Form>

              {/* ✅ Right Icons + Auth */}
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

      {/* ✅ Mobile Offcanvas */}
      <Offcanvas
        show={show}
        onHide={toggleOffcanvas}
        placement="start"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold fs-4 text-gradient">
            SmartTech ✨
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="d-flex flex-column gap-3"
          >
            {/* ✅ Unified Search in Offcanvas */}
            <Form className="d-flex mb-3" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2 flex-grow-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-dark"
                className="rounded-pill px-3"
              >
                <FaSearch />
              </Button>
            </Form>

            {/* ✅ Offcanvas Links */}
            <Nav className="flex-column">
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <Nav.Link as={NavLink} to="/" onClick={toggleOffcanvas}>
                  <FaHome /> Home
                </Nav.Link>
              </motion.div>

              {/* 🛍️ Shop Dropdown */}
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <div className="dropdown w-100">
                  <button
                    className="btn btn-outline-dark w-100 dropdown-toggle text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaShoppingBag /> Shop
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/shop"
                        onClick={toggleOffcanvas}
                      >
                        All Products
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <li key={cat}>
                          <NavLink
                            className="dropdown-item text-capitalize"
                            to={`/shop?category=${encodeURIComponent(cat)}`}
                            onClick={toggleOffcanvas}
                          >
                            {cat}
                          </NavLink>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className="dropdown-item text-muted">
                          No categories yet
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* 📖 About */}
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <Nav.Link as={NavLink} to="/about" onClick={toggleOffcanvas}>
                  <FaInfoCircle /> About
                </Nav.Link>
              </motion.div>

              {/* ✉️ Contact */}
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <Nav.Link as={NavLink} to="/contact" onClick={toggleOffcanvas}>
                  <FaEnvelope /> Contact
                </Nav.Link>
              </motion.div>

              {/* 🛒 Cart */}
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <Nav.Link
                  as={NavLink}
                  to="/cart"
                  onClick={toggleOffcanvas}
                  className="position-relative"
                >
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge bg="danger" pill className="badge-custom">
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </motion.div>

              {/* 💖 Wishlist */}
              <motion.div whileHover={{ scale: 1.05, x: 5 }}>
                <Nav.Link
                  as={NavLink}
                  to="/wishlist"
                  onClick={toggleOffcanvas}
                  className="position-relative"
                >
                  <FaHeart /> Wishlist
                  {wishlistItems.length > 0 && (
                    <Badge bg="danger" pill className="badge-custom">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </motion.div>
            </Nav>

            <hr />

            {/* ✅ Auth Section */}
            {user ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="fw-semibold mb-2 text-muted">
                  {user.displayName || user.email}
                </div>
                <Button
                  variant="outline-dark"
                  className="w-100 d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
                {isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin"
                    className="text-warning mt-2 fw-bold"
                  >
                    <FaUserCog /> Admin
                  </Nav.Link>
                )}
              </motion.div>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={toggleOffcanvas}
                  className="menu-link"
                >
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  onClick={toggleOffcanvas}
                  className="menu-link"
                >
                  <FaUserPlus /> Register
                </Nav.Link>
              </>
            )}
          </motion.div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
