
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Adding to Geo cart:', { id, name });
    
    try {
      await addToCart(id, 1);
      toast({
        title: "Added to cart",
        description: `Geo ${name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to Geo cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white border border-gray-200 hover:border-gray-300 professional-card h-full">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={`Geo ${name}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isNew && (
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-white shadow-lg text-xs sm:text-sm">
              New
            </Badge>
          )}
          {isOnSale && (
            <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white shadow-lg text-xs sm:text-sm">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-3 sm:p-4 flex flex-col h-full">
          <p className="text-xs sm:text-sm text-gray-500 mb-1 uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-primary transition-colors flex-grow">
            Geo {name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {isOnSale && originalPrice ? (
                <>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">৳{originalPrice}</span>
                  <span className="text-lg sm:text-xl font-bold text-red-600">৳{price}</span>
                </>
              ) : (
                <span className="text-lg sm:text-xl font-bold text-primary">৳{price}</span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-200 professional-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 transform hover:scale-105 shadow-md hover:shadow-lg"
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
