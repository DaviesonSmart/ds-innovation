import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTruck, FaShieldAlt, FaGem, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TrustBadges() {
const badges = [
{
icon: <FaTruck size={40} />,
title: "Fast Delivery",
text: "Quick and reliable delivery across Nigeria.",
},
{
icon: <FaShieldAlt size={40} />,
title: "Secure Checkout",
text: "Safe and protected payment experience.",
},
{
icon: <FaGem size={40} />,
title: "Premium Quality",
text: "Carefully selected fashion pieces you’ll love.",
},
{
icon: <FaHeadset size={40} />,
title: "Customer Support",
text: "Friendly assistance whenever you need help.",
},
];

return ( <section className="trust-section py-5"> <Container> <div className="text-center mb-5">
<p
className="text-primary fw-semibold mb-2"
style={{ letterSpacing: "2px" }}
>
WHY SHOP WITH US </p>

```
      <h2 className="fw-bold">
        Shopping Made Easy
      </h2>
    </div>

    <Row className="g-4">
      {badges.map((badge, index) => (
        <Col md={6} lg={3} key={index}>
          <motion.div
            className="trust-card text-center"
            whileHover={{ y: -8 }}
          >
            <div className="trust-icon">
              {badge.icon}
            </div>

            <h5 className="fw-bold mt-3">
              {badge.title}
            </h5>

            <p className="text-muted mb-0">
              {badge.text}
            </p>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>
</section>

);
}
