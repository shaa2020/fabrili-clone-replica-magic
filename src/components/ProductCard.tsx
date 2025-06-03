
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
}

const ProductCard = ({ id, name, price, image, category, isNew }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(id, 1);
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-orange-600 text-white animate-pulse">
            New
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">৳{price}</span>
          <div className="flex space-x-2">
            <Link to={`/product/${id}`}>
              <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-105">
                View
              </Button>
            </Link>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
