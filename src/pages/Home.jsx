import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SmartTech Collections | Home</title>
        <meta
          name="description"
          content="Shop trendy female wears from SmartTech Collections. Gowns, skirts, crop tops and more!"
        />
        <meta
          name="keywords"
          content="female wears, smarttech, fashion, skirts, tops, online store"
        />
        <meta name="author" content="SmartTech Collections" />
      </Helmet>

      {/* Main homepage sections */}
      <Hero />
      <ProductList />
      <Testimonials />
      <Newsletter />
    </>
  );
}
