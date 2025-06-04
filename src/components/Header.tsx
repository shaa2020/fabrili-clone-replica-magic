
import { useState, useEffect } from 'react';
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
import { Flame, MoreVertical, X, ChevronDown, ShoppingCart } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { items, totalItems } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-xl' : 'py-4 lg:py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 hover:bg-gray-50 rounded-2xl transition-all duration-300 transform hover:scale-105 relative shadow-sm border border-gray-100"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 transition-all duration-300 rotate-180" />
              ) : (
                <MoreVertical className="h-5 w-5 text-gray-700 transition-all duration-300" />
              )}
            </div>
          </button>

          {/* Enhanced Logo - Centered on Mobile/Tablet */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group md:flex-1" 
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className={`bg-white rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-500 animate-float p-2 ${isScrolled ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'}`}>
                <img 
                  src="/lovable-uploads/404332f3-d00d-4521-8ca1-d73b5302608a.png" 
                  alt="GEO Logo" 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-pulse transition-all duration-300 group-hover:from-black group-hover:to-gray-800"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-black leading-none transition-all duration-500 group-hover:text-gray-800 tracking-tight ${isScrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
                GEO
              </span>
              <span className={`text-gray-500 font-semibold tracking-widest transition-all duration-300 group-hover:text-gray-700 uppercase ${isScrolled ? 'text-xs hidden' : 'text-xs hidden sm:block'}`}>
                Premium Quality
              </span>
            </div>
          </Link>

          {/* Professional Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link 
              to="/products" 
              className={`px-4 lg:px-6 py-3 font-semibold text-sm lg:text-base hover:text-black transition-all duration-300 relative group transform hover:scale-105 rounded-xl hover:bg-gray-50 ${isActive('/products') ? 'text-black bg-gray-50' : 'text-gray-700'}`}
            >
              Products
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-300 group-hover:w-8"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 lg:px-6 py-3 font-semibold text-sm lg:text-base text-gray-700 hover:text-black transition-all duration-300 relative group transform hover:scale-105 rounded-xl hover:bg-gray-50 flex items-center space-x-1">
                <span>Collections</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-300 group-hover:w-8"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/98 backdrop-blur-lg shadow-2xl border-0 rounded-2xl p-4 mt-2 w-64 animate-fade-in">
                <DropdownMenuItem asChild>
                  <Link to="/category/t-shirts" className="hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-105 py-4 px-4 flex items-center space-x-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👕</span> 
                    <div>
                      <span className="font-semibold text-gray-900 block">Geo T-Shirts</span>
                      <span className="text-xs text-gray-500">Premium cotton designs</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/hoodies" className="hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-105 py-4 px-4 flex items-center space-x-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🧥</span> 
                    <div>
                      <span className="font-semibold text-gray-900 block">Geo Hoodies</span>
                      <span className="text-xs text-gray-500">Comfortable streetwear</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/mugs" className="hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-105 py-4 px-4 flex items-center space-x-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">☕</span> 
                    <div>
                      <span className="font-semibold text-gray-900 block">Geo Mugs</span>
                      <span className="text-xs text-gray-500">Ceramic masterpieces</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bags" className="hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-105 py-4 px-4 flex items-center space-x-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎒</span> 
                    <div>
                      <span className="font-semibold text-gray-900 block">Geo Bags</span>
                      <span className="text-xs text-gray-500">Functional art pieces</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/custom-design" 
              className={`px-4 lg:px-6 py-3 font-semibold text-sm lg:text-base hover:text-black transition-all duration-300 relative group transform hover:scale-105 rounded-xl hover:bg-gray-50 ${isActive('/custom-design') ? 'text-black bg-gray-50' : 'text-gray-700'}`}
            >
              Design Studio
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-300 group-hover:w-8"></span>
            </Link>
            
            <Link 
              to="/about" 
              className={`px-4 lg:px-6 py-3 font-semibold text-sm lg:text-base hover:text-black transition-all duration-300 relative group transform hover:scale-105 rounded-xl hover:bg-gray-50 ${isActive('/about') ? 'text-black bg-gray-50' : 'text-gray-700'}`}
            >
              About
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-300 group-hover:w-8"></span>
            </Link>
          </nav>

          {/* Enhanced Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-6 lg:ml-8">
            {/* Premium Sale Button */}
            <Link to="/sales" className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 px-4 py-2"
              >
                <Flame className="mr-2 h-4 w-4 animate-pulse" />
                <span className="font-bold text-sm">SALE</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
            </Link>

            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-500 border-2 hover:border-black shadow-md transform hover:scale-105 px-4 py-2">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="font-medium text-sm">Cart</span>
                {totalItems > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white animate-bounce shadow-lg text-xs transform hover:scale-110 transition-all duration-300 min-w-[20px] h-5 flex items-center justify-center">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105 px-4 py-2">
                    <span className="font-medium text-sm">👤 Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/98 backdrop-blur-lg shadow-2xl border-0 rounded-2xl animate-fade-in">
                  <DropdownMenuItem onClick={signOut} className="hover:bg-black/10 rounded-xl transition-all duration-300 py-3 px-4 font-medium">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105 px-4 py-2">
                    <span className="font-medium text-sm">Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 px-4 py-2" size="sm">
                    <span className="font-semibold text-sm">Join</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Mobile Cart Icon - Right Side */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="relative group">
              <Button variant="outline" size="sm" className="relative overflow-hidden hover:bg-black hover:text-white transition-all duration-500 border-2 hover:border-black shadow-md transform hover:scale-105 rounded-2xl p-3">
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center animate-bounce shadow-lg border-2 border-white">
                      {totalItems}
                    </div>
                  )}
                </div>
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
          <nav className="flex flex-col space-y-2 pb-6 border-t border-gray-100 pt-6 bg-white/98 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100">
            {/* Mobile Cart Summary */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mx-4 mb-4">
              <Link to="/cart" onClick={closeMobileMenu} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <span className="font-semibold text-gray-900">Shopping Cart</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500 text-white font-bold">
                    {totalItems} items
                  </Badge>
                  <span className="text-sm text-gray-600">→</span>
                </div>
              </Link>
            </div>

            <Link 
              to="/products" 
              onClick={closeMobileMenu}
              className={`font-semibold py-4 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md flex items-center space-x-3 ${
                isActive('/products') 
                  ? 'text-black bg-gray-50 shadow-md border-l-4 border-black' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">📱</span>
              <span>Products</span>
            </Link>
            
            <div className="px-6 py-3">
              <span className="font-bold text-gray-900 text-base mb-4 block flex items-center space-x-2">
                <span className="text-xl">🎨</span>
                <span>Collections</span>
              </span>
              <div className="ml-8 space-y-3">
                <Link to="/category/t-shirts" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:scale-105 flex items-center space-x-3">
                  <span className="text-lg">👕</span>
                  <div>
                    <span className="font-medium block">Geo T-Shirts</span>
                    <span className="text-xs text-gray-400">Premium cotton designs</span>
                  </div>
                </Link>
                <Link to="/category/hoodies" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:scale-105 flex items-center space-x-3">
                  <span className="text-lg">🧥</span>
                  <div>
                    <span className="font-medium block">Geo Hoodies</span>
                    <span className="text-xs text-gray-400">Comfortable streetwear</span>
                  </div>
                </Link>
                <Link to="/category/mugs" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:scale-105 flex items-center space-x-3">
                  <span className="text-lg">☕</span>
                  <div>
                    <span className="font-medium block">Geo Mugs</span>
                    <span className="text-xs text-gray-400">Ceramic masterpieces</span>
                  </div>
                </Link>
                <Link to="/category/bags" onClick={closeMobileMenu} className="block text-gray-600 hover:text-black transition-all duration-500 py-3 px-4 rounded-lg hover:bg-gray-50 transform hover:scale-105 flex items-center space-x-3">
                  <span className="text-lg">🎒</span>
                  <div>
                    <span className="font-medium block">Geo Bags</span>
                    <span className="text-xs text-gray-400">Functional art pieces</span>
                  </div>
                </Link>
              </div>
            </div>
            
            <Link 
              to="/custom-design" 
              onClick={closeMobileMenu}
              className={`font-semibold py-4 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md flex items-center space-x-3 ${
                isActive('/custom-design') 
                  ? 'text-black bg-gray-50 shadow-md border-l-4 border-black' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🎨</span>
              <span>Design Studio</span>
            </Link>
            
            <Link 
              to="/about" 
              onClick={closeMobileMenu}
              className={`font-semibold py-4 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-md flex items-center space-x-3 ${
                isActive('/about') 
                  ? 'text-black bg-gray-50 shadow-md border-l-4 border-black' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">ℹ️</span>
              <span>About</span>
            </Link>

            <div className="pt-6 border-t border-gray-100 space-y-3 px-6">
              <Link to="/sales" onClick={closeMobileMenu} className="block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 py-3"
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
                  className="w-full hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105 py-3"
                >
                  👤 Sign Out
                </Button>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={closeMobileMenu} className="block">
                    <Button variant="outline" size="sm" className="w-full hover:bg-black hover:text-white transition-all duration-500 shadow-md transform hover:scale-105 py-3">
                      🔐 Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu} className="block">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 py-3" size="sm">
                      ✨ Join
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
