import { FaStar, FaRegStar } from 'react-icons/fa';
import { ProductType } from "@/data/productdata";

interface ProductTabsProps {
  product: ProductType;
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const ProductTabs = ({ product, selectedTab, onTabChange }: ProductTabsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => onTabChange('description')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === 'description' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Description
          </button>
          <button
            onClick={() => onTabChange('reviews')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === 'reviews' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Reviews (128)
          </button>
          <button
            onClick={() => onTabChange('shipping')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === 'shipping' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Shipping & Returns
          </button>
        </nav>
      </div>
      
      <div className="py-6">
        {selectedTab === 'description' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.content || product.description}</p>
          </div>
        )}
        
        {selectedTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-center bg-gray-100 p-4 rounded-lg">
                <p className="text-4xl font-bold">4.5</p>
                <div className="flex justify-center my-1">
                  {[...Array(5)].map((_, i) => (
                    i < 4 ? <FaStar key={i} className="w-4 h-4 text-yellow-400" /> : <FaRegStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">128 reviews</p>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium w-8">{rating} star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-400 h-2.5 rounded-full" 
                        style={{ width: `${(rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Write a Review
            </button>
          </div>
        )}
        
        {selectedTab === 'shipping' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
              <p className="text-gray-700">
                We offer standard shipping (2-4 business days) and express shipping (1-2 business days). 
                All orders are processed within 24 hours of being placed.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
              <p className="text-gray-700">
                If you're not completely satisfied with your purchase, you can return it within 30 days 
                for a full refund or exchange. Items must be in original condition with all tags attached.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;