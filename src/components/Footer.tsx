
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 border-2 sm:border-4 border-white transform rotate-45"></div>
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 border border-white sm:border-2 rounded-full"></div>
        <div className="absolute bottom-5 sm:bottom-10 left-10 sm:left-20 w-8 sm:w-16 h-8 sm:h-16 border border-white sm:border-2 transform rotate-12"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-10 sm:w-20 h-10 sm:h-20 border-2 sm:border-3 border-white"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Enhanced Company Info with uploaded logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                <img 
                  src="/lovable-uploads/404332f3-d00d-4521-8ca1-d73b5302608a.png" 
                  alt="GEO Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white">GEO</span>
                <p className="text-xs text-gray-400 font-medium tracking-wider">GEOMETRIC DESIGN</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Transforming the world through the infinite beauty of geometric design. 
              Where mathematical precision meets creative excellence.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-xs sm:text-sm">📘</span>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-xs sm:text-sm">📷</span>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-xs sm:text-sm">🐦</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-lg sm:text-xl text-white">Explore GEO</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/products", label: "All Products", emoji: "🎨" },
                { to: "/custom-design", label: "Design Studio", emoji: "⚡" },
                { to: "/about", label: "About GEO", emoji: "🌟" },
                { to: "/contact", label: "Contact Us", emoji: "📞" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-lg sm:text-xl text-white">Collections</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/category/t-shirts", label: "Geometric T-Shirts", emoji: "👕" },
                { to: "/category/hoodies", label: "Pattern Hoodies", emoji: "🧥" },
                { to: "/category/mugs", label: "Designer Mugs", emoji: "☕" },
                { to: "/category/bags", label: "Geometric Bags", emoji: "🎒" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 sm:mb-6 text-lg sm:text-xl text-white">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/faq", label: "FAQ", emoji: "❓" },
                { to: "/shipping", label: "Shipping Info", emoji: "🚚" },
                { to: "/returns", label: "Returns", emoji: "↩️" },
                { to: "/size-guide", label: "Size Guide", emoji: "📏" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section with Creator Credit */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm sm:text-base">
                © 2024 GEO - Geometric Design Excellence. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Crafted with precision, designed with passion by <span className="text-primary font-semibold">Shanto</span>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Terms of Service
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="animate-pulse">🔒</span>
                <span className="text-xs sm:text-sm">Secure Shopping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
