
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

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
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(id, 1);
  };

  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-2xl hover:shadow-3xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden transform hover:scale-105" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)' }}>
      <div className="relative overflow-hidden transform-gpu perspective-1000" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))' }}>
        <div className="relative w-full h-64 transform transition-transform duration-300 preserve-3d" style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))' }}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-inner"
            style={{ 
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
              transform: 'translateZ(20px)'
            }}
          />
          {isNew && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-orange-600 text-white animate-pulse shadow-2xl transition-transform" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
              New
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-t from-gray-50 to-white relative" style={{ filter: 'drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.05))' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-50" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}></div>
        <div className="relative z-10">
          <p className="text-sm text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {isOnSale && originalPrice ? (
                <>
                  <span className="text-sm text-gray-500 line-through">৳{originalPrice}</span>
                  <span className="text-lg font-bold text-red-600">৳{price}</span>
                </>
              ) : (
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">৳{price}</span>
              )}
            </div>
            <div className="flex space-x-2">
              <Link to={`/product/${id}`}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  style={{ 
                    transform: 'translateZ(5px)',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
                  }}
                >
                  View
                </Button>
              </Link>
              <Button 
                size="sm" 
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                style={{ 
                  transform: 'translateZ(10px)',
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
