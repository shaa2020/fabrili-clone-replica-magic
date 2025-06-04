
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
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-3xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)' }}>
        <div className="relative aspect-square overflow-hidden transform-gpu perspective-1000" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))' }}>
          <div className="relative w-full h-full transform transition-transform duration-300 preserve-3d group-hover:rotateY-12" style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))' }}>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-110 shadow-inner"
              style={{ 
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                transform: 'translateZ(20px)'
              }}
            />
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-primary text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
                New
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4 bg-gradient-to-t from-gray-50 to-white relative" style={{ filter: 'drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.05))' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-50" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}></div>
          <div className="relative z-10">
            <p className="text-sm text-gray-500 mb-1">{category}</p>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">{name}</h3>
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
                className="bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
                style={{ 
                  transform: 'translateZ(10px)',
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GeoProductCard;
