
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  originalPrice?: number;
  isOnSale?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew, originalPrice, isOnSale }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden professional-card">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={`GEO ${name}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-orange-600 text-white animate-pulse shadow-lg">
            New
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          GEO {name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {isOnSale && originalPrice ? (
              <>
                <span className="text-sm text-gray-500 line-through">৳{originalPrice}</span>
                <span className="text-lg font-bold text-red-600">৳{price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">৳{price}</span>
            )}
          </div>
          <Link to={`/product/${id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-primary hover:text-white transition-all duration-200 professional-button"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
