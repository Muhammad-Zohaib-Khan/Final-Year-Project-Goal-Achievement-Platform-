import {User,Search} from 'lucide-react'
import Link from "next/link";
import { useProductContext } from "@/context/ContextProvidrer";
import Image from "next/image";

const Navbar = () => {
  const { isSeller, router } = useProductContext();

  return (
    <header>
        <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 text-gray-700 font-sans">
            
            {/* Logo */}
            {/*<Image
              src="https://media.istockphoto.com/id/1466153678/photo/shield-concept-3d-rendering-shield-with-check-mark.webp?a=1&b=1&s=612x612&w=0&k=20&c=IBV4xLxrSCBD7Y6dA78PveT7Qq2I1U0ouEtxTM-SSrU="
              alt="Logo"
              className="w-28 md:w-32 cursor-pointer"
              onClick={() => router.push("/")}
            />*/}

            {/* Links (Desktop) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm">
              <Link href="/" className="hover:text-orange-600 transition font-semibold">
                Home
              </Link>
              <Link href="/all-products" className="hover:text-orange-600 transition font-semibold">
                Shop
              </Link>
              <Link href="/about" className="hover:text-orange-600 transition font-semibold">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-orange-600 transition font-semibold">
                Contact
              </Link>

              {isSeller && (
                <button
                  onClick={() => router.push("/dashboard/Marketplace/seller")}
                  className="border border-orange-600 text-orange-600 hover:bg-orange-50 transition px-4 py-1.5 rounded-full text-xs font-semibold"
                >
                  Seller Dashboard
                </button>
              )}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-6">
              <Search className="w-5 h-5" />
              <button className="flex items-center gap-2 hover:text-orange-600 transition font-semibold">
                <User className="w-5 h-5" />
                Account
              </button>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-4">
              {isSeller && (
                <button
                  onClick={() => router.push("/seller")}
                  className="text-xs border px-3 py-1.5 rounded-full font-medium hover:bg-orange-50 border-orange-600 text-orange-600 transition"
                >
                  Seller
                </button>
              )}
              <button className="flex items-center gap-1 hover:text-orange-600 transition font-semibold">
                <User className="w-5 h-5" />
                Account
              </button>
            </div>
          </div>
        </nav>

    </header>
  );
};

export default Navbar;