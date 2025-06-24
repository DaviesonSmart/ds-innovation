import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowAltCircleUp } from "react-icons/fa"; // Importing the icon from react-icons
import { motion } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="position-fixed"
        style={{
          bottom: "30px",
          right: "30px",
          zIndex: "9999",
        }}
      >
        <Button
          variant="dark"
          className="rounded-circle shadow"
          onClick={scrollToTop}
        >
          <FaArrowAltCircleUp size={20} />
        </Button>
      </motion.div>
    )
  );
}
