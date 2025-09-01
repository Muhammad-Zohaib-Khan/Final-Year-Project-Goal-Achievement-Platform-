"use client";

import React from "react";
import { useProductContext } from "@/context/ContextProvidrer";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { 
    cartItems, 
    products, 
    updateCartQuantity,
  } = useProductContext();

  // Get full product details for items in cart
  const getCartProducts = () => {
    return Object.entries(cartItems).map(([itemId, quantity]) => {
      const product = products.find(p => p.recipe_id.toString() === itemId);
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
  };

  const cartProducts = getCartProducts();

  const handleRemoveItem = (itemId: string) => {
    updateCartQuantity(itemId, 0);
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Your Shopping Cart
      </h1>

      {cartProducts.length === 0 ? (
        <div className="text-center py-16 rounded-lg bg-gray-50">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
          <Link
            href="/dashboard/Marketplace/all-products"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartProducts.map((item) => (
            <div
              key={item?.recipe_id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                {item?.image_url && item?.title && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item?.title}
                    </h3>
                    <p className="text-orange-500 font-semibold mt-1">
                      ${item?.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => item?.recipe_id && handleRemoveItem(item.recipe_id.toString())}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex items-center">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button className="px-2 py-1 rounded-xl bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg
                    active:scale-95 transition-all duration-200 ease-in-out ">
                        Purchase Now
                    </button>
                  </div>
                  <div className="ml-auto text-lg font-medium"> 
                    {item?.price !=undefined? `$${item.price.toFixed(2)}`:"-"}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-10">
            <Link
              href="/dashboard/Marketplace/all-products"
              className="flex items-center px-6 py-3 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;