
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  sizes?: string[];
  colors: any;
  categories?: { name: string };
}

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart
}: ProductInfoProps) => {
  // Type-safe handling of colors
  const colors = Array.isArray(product.colors) 
    ? product.colors.filter((color): color is string => typeof color === 'string') 
    : [];

  return (
    <div>
      <div className="mb-4">
        <Badge variant="secondary" className="mb-2">{product.categories?.name}</Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-2">
          {product.sale_price ? (
            <>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">৳{product.sale_price}</span>
              <span className="text-lg text-gray-500 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">৳{product.price}</span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:bg-primary hover:text-white transition-all duration-200"
          >
            -
          </Button>
          <span className="px-4 py-2 border rounded-md min-w-[3rem] text-center">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="hover:bg-primary hover:text-white transition-all duration-200"
          >
            +
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mb-8">
        <Button
          onClick={onAddToCart}
          className="flex-1 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Add to Cart
        </Button>
        <Link to="/custom-design" className="flex-1">
          <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-all duration-200">
            Customize Design
          </Button>
        </Link>
      </div>

      {/* Product Features */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Product Features</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-orange-600 rounded-full mr-3"></span>
            Premium Quality Materials
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-orange-600 rounded-full mr-3"></span>
            Comfortable Fit
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-orange-600 rounded-full mr-3"></span>
            Durable Construction
          </li>
          <li className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-gradient-to-r from-primary to-orange-600 rounded-full mr-3"></span>
            Easy Care Instructions
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
