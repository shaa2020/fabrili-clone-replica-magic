
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
}

const GeoProductCard = ({ id, name, price, image, category, isNew }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(id, 1);
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-transform hover:scale-105">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-primary text-white">
              New
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">৳{price}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90"
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
