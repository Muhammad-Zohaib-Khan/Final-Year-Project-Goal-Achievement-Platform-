'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { users, products } from '@/data/productdata';

type Product = {
  recipe_id: number;
  title: string;
  image_url: string;
  content: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
};

type User = {
  user_id: number;
  name: string;
  email: string;
  password: string;  // Note: Store hashed passwords only in real applications
  address: string;
  phone: string;
  created_at: string;
};

interface AppContextType {
  currency: string;
  isSeller: boolean;
  router: ReturnType<typeof useRouter>;
  setIsSeller: (isSeller: boolean) => void;
  products: Product[];
  users: User[];
  fetchUserData: () => Promise<void>;
  fetchProductData: () => Promise<void>;
  cartItems: Record<string, number>;
  setCartItems: (cartItems: Record<string, number>) => void;
  addToCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const [isSeller, setIsSeller] = useState<boolean>(true);
  const router = useRouter();
  const [myproducts, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const fetchProductData = async () => {
    setProducts(products);
  };

  const fetchUserData = async () => {
    setUserData(users);
  };

  const addToCart = async (itemId: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (quantity === 0) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = quantity;
      }
      return newCart;
    });
  };

  const getCartCount = (): number => {
    return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getCartAmount = (): number => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = myproducts.find(product => product.recipe_id.toString() === itemId);
      return item ? total + (item.price * quantity) : total;
    }, 0);
  };

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  const value: AppContextType = {
    currency,
    router,
    isSeller,
    setIsSeller,
    users: userData,
    fetchUserData,
    products: myproducts,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};