
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
import { Flame, MoreVertical, X } from 'lucide-react';

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
        <div className="flex items-center justify-between md:justify-start">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105 relative"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 transition-all duration-300 rotate-180" />
              ) : (
                <MoreVertical className="h-6 w-6 text-gray-700 transition-all duration-300" />
              )}
            </div>
          </button>

          {/* Enhanced Logo - Centered on Mobile/Tablet */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 group absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none" 
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500 animate-float p-1.5 sm:p-2">
                <img 
                  src="/lovable-uploads/404332f3-d00d-4521-8ca1-d73b5302608a.png" 
                  alt="GEO Logo" 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded-full animate-pulse transition-all duration-300 group-hover:bg-black"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-none transition-all duration-500 group-hover:text-gray-800">
                GEO
              </span>
              <span className="text-xs sm:text-xs text-gray-500 font-medium tracking-wider hidden sm:block transition-all duration-300 group-hover:text-gray-700">
                GEOMETRIC DESIGN
              </span>
            </div>
          </Link>

          {/* Enhanced Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto">
            <Link 
              to="/products" 
              className={`font-semibold hover:text-black transition-all duration-500 relative group transform hover:scale-105 ${isActive('/products') ? 'text-black' : 'text-gray-700'}`}
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="font-semibold text-gray-700 hover:text-black transition-all duration-500 relative group transform hover:scale-105">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 group-hover:w-full"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/98 backdrop-blur-md shadow-2xl border-0 rounded-2xl p-3 animate-fade-in transition-all duration-500">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-black/10 rounded-xl transition-all duration-300 transform hover:scale-105 py-3 px-4">
                    <span className="mr-3 text-lg">👕</span> 
                    <span className="font-medium">Geometric T-Shirts</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-black/10 rounded-xl transition-all duration-300 transform hover:scale-105 py-3 px-4">
                    <span className="mr-3 text-lg">🧥</span> 
                    <span className="font-medium">Pattern Hoodies</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-black/10 rounded-xl transition-all duration-300 transform hover:scale-105 py-3 px-4">
                    <span className="mr-3 text-lg">☕</span> 
                    <span className="font-medium">Designer Mugs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-black/10 rounded-xl transition-all duration-300 transform hover:scale-105 py-3 px-4">
                    <span className="mr-3 text-lg">🎒</span> 
                    <span className="font-medium">Geometric Bags</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/custom-design" 
              className={`font-semibold hover:text-black transition-all duration-500 relative group transform hover:scale-105 ${isActive('/custom-design') ? 'text-black' : 'text-gray-700'}`}
            >
              Design Studio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`font-semibold hover:text-black transition-all duration-500 relative group transform hover:scale-105 ${isActive('/about') ? 'text-black' : 'text-gray-700'}`}
            >
              About GEO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Enhanced Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 ml-6">
            {/* Animated Sale Button */}
            <Link to="/sales" className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
              >
                <Flame className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold">SALE</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
            </Link>

            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-500 border-2 hover:border-black shadow-md transform hover:scale-105">
                <span className="text-xs sm:text-sm font-medium">🛒 Cart</span>
                {cartCount > 0 && (
                  <Badge className="ml-1 sm:ml-2 bg-black text-white animate-bounce shadow-lg text-xs transform hover:scale-110 transition-all duration-300">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105">
                    <span className="text-xs sm:text-sm font-medium">👤 Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/98 backdrop-blur-md shadow-2xl border-0 rounded-2xl animate-fade-in">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-black/10 rounded-xl transition-all duration-300 py-3 px-4 font-medium">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-500 shadow-md text-xs sm:text-sm transform hover:scale-105">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 text-xs sm:text-sm" size="sm">
                    Join GEO
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Cart Icon - Right Side */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-500 border-2 hover:border-black shadow-md p-2 transform hover:scale-105">
                <span className="text-sm">🛒</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-black text-white animate-bounce shadow-lg text-xs min-w-[18px] h-[18px] flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-700 ease-in-out transform ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 mt-6 scale-100' 
            : 'max-h-0 opacity-0 overflow-hidden scale-95'
        }`}>
          <nav className="flex flex-col space-y-4 pb-6 border-t border-gray-200 pt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
            <Link 
              to="/products" 
              onClick={closeMobileMenu}
              className={`font-semibold py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md ${
                isActive('/products') 
                  ? 'text-black bg-gray-100 shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              📱 Products
            </Link>
            
            <div className="px-4 py-2">
              <span className="font-bold text-gray-800 text-sm mb-3 block">🎨 Collections</span>
              <div className="ml-4 space-y-3">
                <Link to="/category/t-shirts" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-2 px-3 rounded-lg hover:bg-gray-50 transform hover:scale-105">
                  👕 Geometric T-Shirts
                </Link>
                <Link to="/category/hoodies" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-2 px-3 rounded-lg hover:bg-gray-50 transform hover:scale-105">
                  🧥 Pattern Hoodies
                </Link>
                <Link to="/category/mugs" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-2 px-3 rounded-lg hover:bg-gray-50 transform hover:scale-105">
                  ☕ Designer Mugs
                </Link>
                <Link to="/category/bags" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-2 px-3 rounded-lg hover:bg-gray-50 transform hover:scale-105">
                  🎒 Geometric Bags
                </Link>
              </div>
            </div>
            
            <Link 
              to="/custom-design" 
              onClick={closeMobileMenu}
              className={`font-semibold py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md ${
                isActive('/custom-design') 
                  ? 'text-black bg-gray-100 shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              🎨 Design Studio
            </Link>
            
            <Link 
              to="/about" 
              onClick={closeMobileMenu}
              className={`font-semibold py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md ${
                isActive('/about') 
                  ? 'text-black bg-gray-100 shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              ℹ️ About GEO
            </Link>

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link to="/sales" onClick={closeMobileMenu} className="block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <Flame className="mr-2 h-4 w-4 animate-pulse" />
                  <span className="font-bold">🔥 SALE</span>
                </Button>
              </Link>
              
              {user ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="w-full hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105"
                >
                  👤 Sign Out
                </Button>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={closeMobileMenu} className="block">
                    <Button variant="outline" size="sm" className="w-full hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105">
                      🔐 Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu} className="block">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105" size="sm">
                      ✨ Join GEO
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
