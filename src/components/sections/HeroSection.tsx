import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-black min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-float mb-8">
            <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-lg">
              <div className="w-16 h-16 bg-white/30 rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in leading-tight">
            Welcome to <span className="text-gray-200 animate-pulse">GEO</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-slide-up font-light">
            Where Geometry Meets <span className="text-gray-200 font-semibold">Creativity</span>
          </p>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Transform your ideas into stunning geometric designs. Premium quality apparel and merchandise 
            with precision-crafted patterns that make every piece a work of art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link to="/custom-design">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg text-xl px-12 py-6 border-2 border-white">
                <Palette className="mr-3 h-6 w-6" />
                Start Creating
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black backdrop-blur-sm transform hover:scale-110 transition-all duration-300 shadow-lg text-xl px-12 py-6">
                <Sparkles className="mr-3 h-6 w-6" />
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/20 transform rotate-45 animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gray-300/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-white/15 clip-polygon animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-16 w-14 h-14 bg-gray-300/25 transform rotate-12 animate-float" style={{animationDelay: '0.5s'}}></div>
    </section>
  );
};

export default HeroSection;
