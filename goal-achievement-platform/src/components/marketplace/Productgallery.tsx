import React, { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoFlash } from 'react-icons/io5';
import { toast } from "react-hot-toast";
import { ProductType } from "@/data/productdata";

const ProductGallery = ({ product }: { product: ProductType }) => {
  const [mainImage, setMainImage] = useState(product.image_url);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const discountPercentage = Math.floor(Math.random() * 30) + 10;

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
        onMouseMove={handleImageZoom}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={mainImage}
          alt={product.title}
          className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
          width={1280}
          height={720}
          priority
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </span>
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <IoFlash size={10} /> Popular
          </span>
        </div>
        
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
          onClick={() => toast("Showing previous image", { position: 'top-center' })}
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
          onClick={() => toast("Showing next image", { position: 'top-center' })}
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[product.image_url, product.image_url, product.image_url].map((img, idx) => (
          <button
            key={idx}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-orange-500' : 'border-gray-200'}`}
            onClick={() => setMainImage(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;