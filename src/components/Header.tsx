
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
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              GEO
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`font-medium hover:text-primary transition-colors duration-200 ${isActive('/products') ? 'text-primary' : 'text-gray-700'}`}
            >
              Products
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl border-0 rounded-xl">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-gray-50">T-Shirts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-gray-50">Hoodies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-gray-50">Mugs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-gray-50">Bags</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link 
              to="/custom-design" 
              className={`font-medium hover:text-primary transition-colors duration-200 ${isActive('/custom-design') ? 'text-primary' : 'text-gray-700'}`}
            >
              Custom Design
            </Link>
            <Link 
              to="/about" 
              className={`font-medium hover:text-primary transition-colors duration-200 ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-primary hover:text-white transition-all duration-200">
                Cart
                {cartCount > 0 && (
                  <Badge className="ml-2 bg-primary text-white animate-pulse">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-all duration-200">
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-xl border-0 rounded-xl">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-gray-50">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-all duration-200">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200" size="sm">
                    Sign Up
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
