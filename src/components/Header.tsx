
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Flame } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo with uploaded image */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 animate-float p-2">
                <img 
                  src="/lovable-uploads/404332f3-d00d-4521-8ca1-d73b5302608a.png" 
                  alt="GEO Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-black leading-none">
                GEO
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">
                GEOMETRIC DESIGN
              </span>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`font-semibold hover:text-black transition-colors duration-200 relative group ${isActive('/products') ? 'text-black' : 'text-gray-700'}`}
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="font-semibold text-gray-700 hover:text-black transition-colors duration-200 relative group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-lg border-0 rounded-2xl p-2">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-black/10 rounded-xl transition-colors">
                    <span className="mr-2">👕</span> Geometric T-Shirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-black/10 rounded-xl transition-colors">
                    <span className="mr-2">🧥</span> Pattern Hoodies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-black/10 rounded-xl transition-colors">
                    <span className="mr-2">☕</span> Designer Mugs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-black/10 rounded-xl transition-colors">
                    <span className="mr-2">🎒</span> Geometric Bags
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/custom-design" 
              className={`font-semibold hover:text-black transition-colors duration-200 relative group ${isActive('/custom-design') ? 'text-black' : 'text-gray-700'}`}
            >
              Design Studio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`font-semibold hover:text-black transition-colors duration-200 relative group ${isActive('/about') ? 'text-black' : 'text-gray-700'}`}
            >
              About GEO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Enhanced Actions */}
          <div className="flex items-center space-x-4">
            {/* Animated Sale Button */}
            <Link to="/sales" className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Flame className="mr-2 h-4 w-4 animate-pulse" />
                SALE
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>

            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-300 border-2 hover:border-black shadow-md">
                🛒 Cart
                {cartCount > 0 && (
                  <Badge className="ml-2 bg-black text-white animate-bounce shadow-lg">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                    👤 Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-lg border-0 rounded-2xl">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-black/10 rounded-xl transition-colors">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="sm">
                    Join GEO
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
