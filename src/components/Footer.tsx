
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white transform rotate-45"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-16 h-16 border-2 border-white transform rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border-3 border-white"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-geo rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-white">GEO</span>
                <p className="text-xs text-gray-400 font-medium tracking-wider">GEOMETRIC DESIGN</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming the world through the infinite beauty of geometric design. 
              Where mathematical precision meets creative excellence.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-sm">📘</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-sm">📷</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <span className="text-sm">🐦</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">Explore GEO</h4>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "All Products", emoji: "🎨" },
                { to: "/custom-design", label: "Design Studio", emoji: "⚡" },
                { to: "/about", label: "About GEO", emoji: "🌟" },
                { to: "/contact", label: "Contact Us", emoji: "📞" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Collections */}
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">Collections</h4>
            <ul className="space-y-3">
              {[
                { to: "/category/t-shirts", label: "Geometric T-Shirts", emoji: "👕" },
                { to: "/category/hoodies", label: "Pattern Hoodies", emoji: "🧥" },
                { to: "/category/mugs", label: "Designer Mugs", emoji: "☕" },
                { to: "/category/bags", label: "Geometric Bags", emoji: "🎒" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Support */}
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">Support</h4>
            <ul className="space-y-3">
              {[
                { to: "/faq", label: "FAQ", emoji: "❓" },
                { to: "/shipping", label: "Shipping Info", emoji: "🚚" },
                { to: "/returns", label: "Returns", emoji: "↩️" },
                { to: "/size-guide", label: "Size Guide", emoji: "📏" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 GEO - Geometric Design Excellence. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm text-center md:text-left mt-1">
                Crafted with precision, designed with passion.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="animate-pulse">🔒</span>
                <span className="text-sm">Secure Shopping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
