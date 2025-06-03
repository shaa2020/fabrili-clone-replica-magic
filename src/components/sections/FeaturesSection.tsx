
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
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-geo-gradient mb-6">Why Choose GEO?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of geometric precision and creative freedom</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.title} className="group animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <Card className="p-8 h-full gradient-card hover:shadow-geo-lg transform hover:scale-105 transition-all duration-500 border-0">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
