
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-center">
      {/* Unique Geometric Background Design */}
      <div className="absolute inset-0">
        {/* Main background with geometric pattern */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Animated geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large rotating squares */}
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/20 transform rotate-45 animate-spin-slow"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border-4 border-gray-300/30 transform rotate-12 animate-pulse"></div>
            <div className="absolute bottom-32 left-20 w-40 h-40 border-4 border-white/15 transform rotate-45 animate-bounce"></div>
            
            {/* Floating circles */}
            <div className="absolute top-32 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-40 right-10 w-20 h-20 bg-gray-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
            
            {/* Hexagon shapes */}
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 transform rotate-12" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gray-300/15 transform rotate-45 animate-pulse" style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}></div>
            
            {/* Triangular elements */}
            <div className="absolute top-1/2 left-10 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-white/20 animate-bounce"></div>
            <div className="absolute top-1/3 right-20 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-gray-300/25 animate-pulse"></div>
          </div>
        </div>
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="transform transition-all duration-1000 hover:scale-105 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-2xl transition-all duration-500 hover:bg-white/30">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white/40 rounded-full transition-all duration-300"></div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-4 sm:mb-6 transition-all duration-700 leading-tight transform hover:scale-105">
            Welcome to <span className="text-gray-200 transition-all duration-500 hover:text-white">GEO</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-4 sm:mb-6 md:mb-8 transition-all duration-500 font-light px-2 sm:px-4 transform hover:scale-105">
            Where Geometry Meets <span className="text-gray-200 font-semibold transition-all duration-300 hover:text-white">Creativity</span>
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto transition-all duration-500 leading-relaxed px-2 sm:px-4 md:px-6 transform hover:scale-105">
            Transform your ideas into stunning geometric designs. Premium quality apparel and merchandise 
            with precision-crafted patterns that make every piece a work of art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2 sm:px-4 transform transition-all duration-700 hover:scale-105">
            <Link to="/custom-design" className="w-full sm:w-auto group">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-500 shadow-2xl text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 border-2 border-white hover:shadow-white/20 group-hover:bg-gray-50">
                <Palette className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:rotate-12" />
                Start Creating
              </Button>
            </Link>
            <Link to="/products" className="w-full sm:w-auto group">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-black backdrop-blur-sm transform hover:scale-110 transition-all duration-500 shadow-2xl text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 hover:shadow-white/20">
                <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:rotate-12" />
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
