'use client';

import { useState } from "react";
import { useProductContext } from "@/context/ContextProvidrer"; // ✅ FIXED TYPO
import Navbar from "@/components/marketplace/Navbar";
import Footer from "@/components/marketplace/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Product {
  recipe_id: number;
  title: string;
  image_url: string;
  content: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
}

const AllProducts = () => {
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = (products || []).filter((product: Product) => {
    const title = product.title || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <section className="px-6 md:px-16 lg:px-32 py-12 bg-white text-black min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Explore All Products
          </h1>
          <p className="text-gray-500 md:text-lg max-w-2xl">
            Discover premium quality and exclusive items curated for you.
          </p>
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.recipe_id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No products found.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllProducts;
