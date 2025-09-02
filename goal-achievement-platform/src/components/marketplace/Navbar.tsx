"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const highlights = [
  "⚡ Fast & Secure Payments",
  "🛍️ Over 10,000+ Products",
];
const rightside = "✨ Shop Smarter. Sell Faster.";

// Animation variants
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // typing effect
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [index, setIndex] = useState(0);

  // Auto-rotate highlights every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <nav className="w-full border-b border-orange-300 bg-gradient-to-r from-orange-100 via-white to-orange-50 shadow-md">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 font-sans">

          {/* Animated Highlight Badge */}
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 0 0px rgba(249,115,22,0.6)", // Tailwind orange-500
                    "0 0 12px rgba(249,115,22,0.8)",
                    "0 0 0px rgba(249,115,22,0.6)",
                  ],
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="px-4 py-1 rounded-full border border-orange-500 text-orange-600 font-semibold text-sm bg-orange-50 shadow-sm"
              >
                {highlights[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side (typing-like animation) */}
          <div className="hidden md:flex items-center gap-6">
            <motion.div
              className="text-orange-700 font-semibold text-base tracking-wide"
              variants={container}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              {rightside.split("").map((char, i) => (
                <motion.span key={i} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>


        </div>
      </nav>
    </header>
  );
};

export default Navbar;