'use client';
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Home=()=> {
  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 min-h-screen relative overflow-hidden grainy">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="font-extrabold text-5xl md:text-7xl text-gray-900 leading-tight"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Goal{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-lime-600 drop-shadow-md">
            Achievement
          </span>{" "}
          Platform.
        </motion.h1>

        <div className="mt-6">
          <h2 className="text-xl md:text-3xl font-medium text-slate-700">
            <TypewriterTitle />
          </h2>
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/login">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition-all">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
export default Home;