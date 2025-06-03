
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

const Header = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-geo border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-geo rounded-2xl flex items-center justify-center shadow-geo transform group-hover:scale-110 transition-all duration-300 animate-float">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-geo-gradient leading-none">
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
              className={`font-semibold hover:text-primary transition-colors duration-200 relative group ${isActive('/products') ? 'text-primary' : 'text-gray-700'}`}
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-geo transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="font-semibold text-gray-700 hover:text-primary transition-colors duration-200 relative group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-geo transition-all duration-300 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-geo border-0 rounded-2xl p-2">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-primary/10 rounded-xl transition-colors">
                    <span className="mr-2">👕</span> Geometric T-Shirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-primary/10 rounded-xl transition-colors">
                    <span className="mr-2">🧥</span> Pattern Hoodies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-primary/10 rounded-xl transition-colors">
                    <span className="mr-2">☕</span> Designer Mugs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-primary/10 rounded-xl transition-colors">
                    <span className="mr-2">🎒</span> Geometric Bags
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/custom-design" 
              className={`font-semibold hover:text-primary transition-colors duration-200 relative group ${isActive('/custom-design') ? 'text-primary' : 'text-gray-700'}`}
            >
              Design Studio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-geo transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`font-semibold hover:text-primary transition-colors duration-200 relative group ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}
            >
              About GEO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-geo transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Enhanced Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-primary hover:text-white transition-all duration-300 border-2 hover:border-primary shadow-md">
                🛒 Cart
                {cartCount > 0 && (
                  <Badge className="ml-2 bg-gradient-geo text-white animate-bounce shadow-lg">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-all duration-300 shadow-md">
                    👤 Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-geo border-0 rounded-2xl">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-primary/10 rounded-xl transition-colors">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-all duration-300 shadow-md">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-geo hover:bg-gradient-geo-dark text-white shadow-geo hover:shadow-geo-lg transition-all duration-300 transform hover:scale-105" size="sm">
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
