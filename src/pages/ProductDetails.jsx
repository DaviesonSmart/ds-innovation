// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Image, Badge } from "react-bootstrap";
import { FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { fetchProducts } from "../firebaseHelpers"; // ✅ get products from Firestore
import NavigationBar from "../components/NavigationBar";
import Loader from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { WishlistContext } from "../contexts/WishlistContext";
import { toast } from "react-toastify";
import ProductReviews from "../components/ProductReviews";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

 useEffect(() => {
   const loadProduct = async () => {
     try {
       const products = await fetchProducts();

       const found = products.find((p) => p.id === id);

       if (!found) {
         setLoading(false);
         return;
       }

       setProduct(found);

       if (found.images?.length) {
         setSelectedImage(found.images[0]);
       }

       const related = products
         .filter((p) => p.id !== found.id && p.category === found.category)
         .slice(0, 4);

       setRelatedProducts(related);
     } catch (error) {
       console.error("Error fetching product:", error);
     } finally {
       setLoading(false);
     }
   };

   loadProduct();
 }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center py-5">Product not found</p>;

  return (
    <>
      <NavigationBar />
      <Container className="py-5">
        <Row className="g-5 align-items-start">
          <Col md={6}>
            <div className="product-gallery">
              <Image
                src={selectedImage || product.images?.[0]}
                fluid
                className="main-product-image"
              />

              <div className="thumbnail-container mt-3">
                {product.images?.length > 1 &&
                  product.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      className={`thumbnail-image ${
                        selectedImage === img ? "active-thumb" : ""
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
              </div>
            </div>
          </Col>

          <Col md={6}>
            <Badge bg="success" className="mb-3">
              In Stock
            </Badge>

            <h1 className="fw-bold mb-3">{product.name}</h1>

            <h2 className="text-primary fw-bold mb-4">
              ₦{Number(product.price).toLocaleString()}
            </h2>

            <p className="text-muted">{product.description}</p>

            <div className="product-benefits my-4">
              <p>
                <FaTruck className="me-2" />
                Fast Nationwide Delivery
              </p>

              <p>
                <FaShieldAlt className="me-2" />
                Secure Checkout
              </p>
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <Button
                size="lg"
                variant="dark"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </Button>

              <Button
                size="lg"
                variant="outline-danger"
                onClick={() => {
                  addToWishlist(product);
                  toast.success("Added to Wishlist ❤️");
                }}
              >
                <FaHeart className="me-2" />
                Wishlist
              </Button>
            </div>
          </Col>
        </Row>

        <hr className="my-5" />

        {relatedProducts.length > 0 && (
          <div className="mt-5 pt-5">
            <div className="text-center mb-5">
              <p
                className="text-primary fw-semibold mb-2"
                style={{ letterSpacing: "2px" }}
              >
                YOU MAY ALSO LIKE
              </p>

              <h2 className="fw-bold">Related Products</h2>
            </div>

            <Row className="g-4">
              {relatedProducts.map((item) => (
                <Col key={item.id} xs={6} md={3}>
                  <ProductCard product={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <ProductReviews productId={product.id} />
      </Container>
    </>
  );
}
