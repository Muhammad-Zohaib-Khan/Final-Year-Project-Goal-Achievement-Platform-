"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useProductContext } from "@/context/ContextProvidrer";
import Loading from "@/components/marketplace/Loading";
import Navbar from "@/components/marketplace/Navbar";
import Footer from "@/components/marketplace/Footer";
import ProductGallery from "@/components/marketplace/Productgallery";
import ProductInfo from "@/components/marketplace/ProductInfo";
import ProductTabs from "@/components/marketplace/Producttab";
import RelatedProducts from "@/components/marketplace/Relatedproduct";
import { ProductType } from "@/data/productdata";

const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const { products } = useProductContext();
  const [selectedTab, setSelectedTab] = useState('description');

  const product = products.find((p: ProductType) => p.recipe_id.toString() === id);

  if (!product) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-8 lg:px-16 pt-6 pb-20 space-y-16 bg-gray-50">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-sm">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs 
          product={product} 
          selectedTab={selectedTab} 
          onTabChange={setSelectedTab} 
        />

        <RelatedProducts product={product} />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;