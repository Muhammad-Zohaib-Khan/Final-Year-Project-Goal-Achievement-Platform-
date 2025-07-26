import React, { useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { useProductContext } from "@/context/ContextProvidrer"; // ✅ Fixed typo here
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProductType } from "@/data/productdata";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const { addToCart } = useProductContext();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1); // ✅ Fixed missing quantity state

  const discountPercentage = Math.floor(Math.random() * 30) + 10;
  const discountedPrice = (product.price * (1 - discountPercentage / 100)).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product.recipe_id, quantity);
    toast.success(`${quantity} ${product.title} added to cart!`, {
      position: 'bottom-right',
      icon: <FaShoppingCart className="text-orange-500" />,
    });
  };

  const handleBuyNow = () => {
    addToCart(product.recipe_id, quantity);
    router.push("/dashboard/Marketplace/cart");
  };

  return (
    <div className="flex flex-col">
      {/* Product title and actions */}
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <FaHeart size={18} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-orange-500 hover:bg-orange-50">
            <FaShare size={18} />
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
          ))}
          <FaRegStar className="w-4 h-4 text-yellow-400" />
        </div>
        <span className="text-sm text-gray-600">4.5 (128 reviews)</span>
        <span className="text-sm text-green-600 ml-2">In Stock</span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900">
          ${discountedPrice}
          <span className="text-lg font-normal text-gray-500 line-through ml-2">
            {typeof product.price === 'number' && `$${product.price.toFixed(2)}`}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">Tax included. Shipping calculated at checkout.</p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Quantity and Actions */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 py-3 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg transition font-medium"
          >
            <FaShoppingCart /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="py-3 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition font-medium"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Product details table */}
      <div className="border-t border-gray-200 pt-6">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 font-medium text-gray-500 w-32">Category</td>
              <td className="py-2 text-gray-800 capitalize">{product.category}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-500">SKU</td>
              <td className="py-2 text-gray-800">PRD-{product.recipe_id.toString().padStart(4, '0')}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-500">Delivery</td>
              <td className="py-2 text-gray-800">2-4 business days</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-500">Returns</td>
              <td className="py-2 text-gray-800">30 days easy return</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInfo;
