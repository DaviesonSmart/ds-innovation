import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
{
name: "Gowns",
image:
"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
},
{
name: "Crop Tops",
image:
"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
},
{
name: "Jeans",
image:
"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
},
{
name: "Two Piece Sets",
image:
"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
},
];

export default function CategorySection() {
const navigate = useNavigate();

return ( <section className="category-section py-5"> <Container> <div className="text-center mb-5">
<p
className="text-primary fw-semibold mb-2"
style={{ letterSpacing: "2px" }}
>
SHOP BY CATEGORY </p>

```
      <h2 className="fw-bold display-6">
        Find Your Perfect Style
      </h2>

      <p className="text-muted">
        Explore our most popular fashion categories.
      </p>
    </div>

    <Row className="g-4">
      {categories.map((category) => (
        <Col md={6} lg={3} key={category.name}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="category-card"
            onClick={() =>
              navigate(
                `/shop?category=${encodeURIComponent(category.name)}`
              )
            }
          >
            <img
              src={category.image}
              alt={category.name}
            />

            <div className="category-overlay">
              <h4>{category.name}</h4>
            </div>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>
</section>

);
}
