
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
import { Flame, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo with uploaded image */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMobileMenu}>
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 animate-float p-1.5 sm:p-2">
                <img 
                  src="/lovable-uploads/404332f3-d00d-4521-8ca1-d73b5302608a.png" 
                  alt="GEO Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-none transition-all duration-300">
                GEO
              </span>
              <span className="text-xs sm:text-xs text-gray-500 font-medium tracking-wider hidden sm:block">
                GEOMETRIC DESIGN
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {/* Enhanced Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/products" 
              className={`font-semibold hover:text-black transition-all duration-300 relative group ${isActive('/products') ? 'text-black' : 'text-gray-700'}`}
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="font-semibold text-gray-700 hover:text-black transition-all duration-300 relative group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-xl border-0 rounded-2xl p-2 animate-fade-in">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-black/10 rounded-xl transition-all duration-200">
                    <span className="mr-2">👕</span> Geometric T-Shirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-black/10 rounded-xl transition-all duration-200">
                    <span className="mr-2">🧥</span> Pattern Hoodies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-black/10 rounded-xl transition-all duration-200">
                    <span className="mr-2">☕</span> Designer Mugs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-black/10 rounded-xl transition-all duration-200">
                    <span className="mr-2">🎒</span> Geometric Bags
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/custom-design" 
              className={`font-semibold hover:text-black transition-all duration-300 relative group ${isActive('/custom-design') ? 'text-black' : 'text-gray-700'}`}
            >
              Design Studio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`font-semibold hover:text-black transition-all duration-300 relative group ${isActive('/about') ? 'text-black' : 'text-gray-700'}`}
            >
              About GEO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Enhanced Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Animated Sale Button */}
            <Link to="/sales" className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Flame className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
                <span className="text-xs sm:text-sm">SALE</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>

            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-300 border-2 hover:border-black shadow-md">
                <span className="text-xs sm:text-sm">🛒 Cart</span>
                {cartCount > 0 && (
                  <Badge className="ml-1 sm:ml-2 bg-black text-white animate-bounce shadow-lg text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                    <span className="text-xs sm:text-sm">👤 Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-xl border-0 rounded-2xl animate-fade-in">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-black/10 rounded-xl transition-all duration-200">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-300 shadow-md text-xs sm:text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm" size="sm">
                    Join GEO
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-300 border-2 hover:border-black shadow-md p-2">
                <span className="text-sm">🛒</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-black text-white animate-bounce shadow-lg text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col space-y-3 pb-4 border-t border-gray-200 pt-4">
            <Link 
              to="/products" 
              onClick={closeMobileMenu}
              className={`font-semibold py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive('/products') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Products
            </Link>
            
            <div className="px-3 py-2">
              <span className="font-semibold text-gray-700 text-sm">Collections</span>
              <div className="mt-2 ml-4 space-y-2">
                <Link to="/category/t-shirts" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-200 py-1">
                  👕 Geometric T-Shirts
                </Link>
                <Link to="/category/hoodies" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-200 py-1">
                  🧥 Pattern Hoodies
                </Link>
                <Link to="/category/mugs" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-200 py-1">
                  ☕ Designer Mugs
                </Link>
                <Link to="/category/bags" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-200 py-1">
                  🎒 Geometric Bags
                </Link>
              </div>
            </div>
            
            <Link 
              to="/custom-design" 
              onClick={closeMobileMenu}
              className={`font-semibold py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive('/custom-design') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Design Studio
            </Link>
            
            <Link 
              to="/about" 
              onClick={closeMobileMenu}
              className={`font-semibold py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive('/about') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              About GEO
            </Link>

            <div className="pt-3 border-t border-gray-200 space-y-3">
              <Link to="/sales" onClick={closeMobileMenu} className="block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg transition-all duration-300"
                >
                  <Flame className="mr-2 h-4 w-4 animate-pulse" />
                  SALE
                </Button>
              </Link>
              
              {user ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="w-full hover:bg-black hover:text-white transition-all duration-300 shadow-md"
                >
                  👤 Sign Out
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={closeMobileMenu} className="block">
                    <Button variant="outline" size="sm" className="w-full hover:bg-black hover:text-white transition-all duration-300 shadow-md">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu} className="block">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
                      Join GEO
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
