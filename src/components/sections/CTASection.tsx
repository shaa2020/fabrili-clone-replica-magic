
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-geo geo-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in px-4">Ready to Create Something Geometric?</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 animate-slide-up px-4">Join thousands of creators who trust GEO for their geometric design needs</p>
          <Link to="/custom-design">
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-geo btn-3d text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 animate-scale-in border-2 border-white">
              <Palette className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Start Your GEO Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
