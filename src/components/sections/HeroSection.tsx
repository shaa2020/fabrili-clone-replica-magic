
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen md:min-h-[80vh] flex items-center">
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=8256&h=5504&auto=format&fit=crop"
          alt="Fashion Store Background"
          className="w-full h-full object-cover animate-scale-in"
        />
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 animate-gradient"></div>
        {/* Additional Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-float mb-4 sm:mb-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/30 rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
            Welcome to <span className="text-gray-200 animate-pulse">GEO</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 animate-slide-up font-light px-4">
            Where Geometry Meets <span className="text-gray-200 font-semibold">Creativity</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed px-4">
            Transform your ideas into stunning geometric designs. Premium quality apparel and merchandise 
            with precision-crafted patterns that make every piece a work of art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-scale-in px-4">
            <Link to="/custom-design" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-white">
                <Palette className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Start Creating
              </Button>
            </Link>
            <Link to="/products" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-black backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-lg text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6">
                <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating geometric shapes - Hidden on mobile for cleaner look */}
      <div className="hidden md:block absolute top-20 left-10 w-16 h-16 bg-white/20 transform rotate-45 animate-float"></div>
      <div className="hidden md:block absolute top-40 right-20 w-12 h-12 bg-gray-300/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="hidden lg:block absolute bottom-32 left-20 w-20 h-20 bg-white/15 clip-polygon animate-float" style={{animationDelay: '2s'}}></div>
      <div className="hidden lg:block absolute bottom-20 right-16 w-14 h-14 bg-gray-300/25 transform rotate-12 animate-float" style={{animationDelay: '0.5s'}}></div>
    </section>
  );
};

export default HeroSection;
