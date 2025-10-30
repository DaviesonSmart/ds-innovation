// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import { fadeUp, fadeRight, fadeLeft, fadeDown } from "../animations";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SmartTech Collections | Home</title>
        <meta
          name="description"
          content="Shop trendy female wears from SmartTech Collections. Gowns, skirts, crop tops and more!"
        />
      </Helmet>

      {/* ✅ Hero slides from bottom */}
      <motion.div {...fadeUp}>
        <Hero />
      </motion.div>

      {/* ✅ Testimonials slide from right */}
      <motion.div {...fadeRight}>
        <Testimonials />
      </motion.div>

      {/* ✅ Newsletter slides from left */}
      <motion.div {...fadeLeft}>
        <Newsletter />
      </motion.div>

      {/* ✅ Footer slides from top */}
      <motion.div {...fadeDown}>
        
      </motion.div>
    </>
  );
}
