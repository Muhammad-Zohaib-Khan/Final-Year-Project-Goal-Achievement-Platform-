import { useProductContext } from "@/context/ContextProvidrer";
import ProductCard from "@/components/marketplace/ProductCard";
import { useRouter } from "next/navigation";
import { ProductType } from "@/data/productdata";

const RelatedProducts = ({ product }: { product: ProductType }) => {
  const { products } = useProductContext();
  const router = useRouter();

  const relatedProducts = products
    .filter((p: ProductType) => p.category === product.category && p.recipe_id !== product.recipe_id)
    .slice(0, 5);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-2">
        You May Also <span className="text-orange-500">Like</span>
      </h2>
      <p className="text-gray-500 text-center mb-8">Discover similar products that might interest you</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {relatedProducts.map((product: ProductType, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={() => router.push(`/category/${product.category}`)}
          className="px-8 py-3 border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-50 transition font-medium"
        >
          View All in {product.category}
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;