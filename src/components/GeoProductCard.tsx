
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
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

const GeoProductCard = ({ id, name, price, image, category, isNew, originalPrice, isOnSale }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(id, 1);
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white border border-gray-200 hover:border-gray-300 professional-card">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isNew && (
            <Badge className="absolute top-3 left-3 bg-primary text-white shadow-lg">
              New
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {isOnSale && originalPrice ? (
                <>
                  <span className="text-sm text-gray-500 line-through">৳{originalPrice}</span>
                  <span className="text-xl font-bold text-red-600">৳{price}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-primary">৳{price}</span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-200 professional-button"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GeoProductCard;
