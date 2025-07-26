import React from 'react';
import Image from 'next/image';
import { useProductContext } from '@/context/ContextProvidrer';
import { Heart } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';

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

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { currency, router } = useProductContext();

    return (
        <div
            onClick={() => { router.push('/dashboard/Marketplace/product/' + product.recipe_id); scrollTo(0, 0); }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.image_url}
                    alt={product.title}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Heart
                        className="h-3 w-3"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className='h-3 w-3' key={index}>
                        {
                                index < Math.floor(4)
                                    ? <FaStar/>
                                    : <FaRegStar/>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.price}</p>
                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    );
}

export default ProductCard;