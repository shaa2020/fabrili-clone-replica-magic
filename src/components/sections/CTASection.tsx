
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-geo geo-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in">Ready to Create Something Geometric?</h2>
          <p className="text-xl text-white/90 mb-8 animate-slide-up">Join thousands of creators who trust GEO for their geometric design needs</p>
          <Link to="/custom-design">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-geo btn-3d text-xl px-12 py-6 animate-scale-in border-2 border-white">
              <Palette className="mr-3 h-6 w-6" />
              Start Your GEO Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
