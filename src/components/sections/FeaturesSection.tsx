
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Palette, Shield, Clock, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Palette,
      title: "Geometric Design Tools",
      description: "Advanced design suite with precision geometric tools and templates",
      color: "from-gray-700 to-black"
    },
    {
      icon: Zap,
      title: "Lightning Fast Production",
      description: "State-of-the-art printing technology for quick turnaround times",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Museum-grade materials and precision craftsmanship in every product",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: Shield,
      title: "Lifetime Guarantee",
      description: "We stand behind every geometric pattern with our quality promise",
      color: "from-black to-gray-600"
    },
    {
      icon: Clock,
      title: "24/7 Design Support",
      description: "Expert designers available around the clock to help perfect your vision",
      color: "from-gray-800 to-gray-500"
    },
    {
      icon: Sparkles,
      title: "Infinite Possibilities",
      description: "Unlimited design variations with our advanced geometric engine",
      color: "from-gray-700 to-black"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-geo-gradient mb-4 sm:mb-6">Why Choose GEO?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">Experience the perfect blend of geometric precision and creative freedom</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.title} className="group animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <Card className="p-6 sm:p-8 h-full gradient-card hover:shadow-geo-lg transform hover:scale-105 transition-all duration-500 border-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
