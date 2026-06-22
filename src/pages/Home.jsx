// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import AboutSection from "../components/AboutSection";
import { fadeUp, fadeRight, fadeLeft, fadeDown } from "../animations";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";
import CategorySection from "../components/CategorySection";
import TrustBadges from "../components/TrustBadges";

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

      <motion.div {...fadeUp}>
        <CategorySection/>
      </motion.div>
      

      <motion.div {...fadeDown}>
       <FeaturedProducts />
      </motion.div>

      <motion.div {...fadeDown}>
      <NewArrivals />
      </motion.div>



      <motion.div {...fadeDown}>
      <TrustBadges />
      </motion.div>

    
          <motion.div {...fadeDown}>
        <AboutSection />
      </motion.div>

      {/* ✅ Testimonials slide from right */}
      <motion.div {...fadeRight}>
        <Testimonials />
      </motion.div>

      {/* ✅ Newsletter slides from left */}
      <motion.div {...fadeLeft}>
        <Newsletter />
      </motion.div>
    </>
  );
}
