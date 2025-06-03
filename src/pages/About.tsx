
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, Award, Globe, Heart, Zap, Palette } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-geo geo-pattern overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-float mb-8">
              <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-geo-lg">
                <span className="text-4xl font-bold text-white">G</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">About GEO</h1>
            <p className="text-2xl text-white/90 mb-8 animate-slide-up">
              Where Geometric Precision Meets Creative Excellence
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto animate-fade-in leading-relaxed">
              We're not just a design company – we're geometric innovators, precision craftsmen, 
              and creative visionaries dedicated to transforming the world through the power of geometric art.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
                  alt="GEO geometric design workspace"
                  className="w-full h-96 object-cover rounded-3xl shadow-geo"
                />
              </div>
              <div className="animate-slide-up">
                <h2 className="text-4xl font-bold text-geo-gradient mb-6">The GEO Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Founded in 2020 by a team of mathematicians, artists, and engineers, GEO was born from 
                  a simple yet revolutionary idea: that geometric precision could unlock infinite creative possibilities.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We believe that geometry is the universal language of design. From the golden ratio in nature 
                  to the sacred geometries of ancient civilizations, patterns and shapes have always held the 
                  power to inspire, heal, and transform.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, GEO stands at the forefront of geometric design innovation, empowering creators worldwide 
                  to harness the mathematical beauty that surrounds us and transform it into stunning, 
                  wearable art that speaks to the soul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-geo-gradient mb-6">Our Geometric Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every pattern, every design, every creation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Precision",
                description: "Every angle calculated, every line purposeful, every pattern perfect",
                color: "from-primary-500 to-primary-600"
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Pushing the boundaries of geometric design with cutting-edge technology",
                color: "from-secondary-500 to-secondary-600"
              },
              {
                icon: Heart,
                title: "Passion",
                description: "Deep love for the mathematical beauty that exists in perfect forms",
                color: "from-accent-500 to-accent-600"
              },
              {
                icon: Globe,
                title: "Unity",
                description: "Connecting cultures through the universal language of geometric art",
                color: "from-primary-600 to-secondary-500"
              }
            ].map((value, index) => (
              <div key={value.title} className="animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                <Card className="p-8 h-full text-center gradient-card hover:shadow-geo transition-all duration-500 transform hover:scale-105 border-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <value.icon className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-geo-gradient mb-8 animate-fade-in">Our GEO Mission</h2>
            <div className="bg-white rounded-3xl p-12 shadow-geo-lg animate-scale-in">
              <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                To democratize geometric design and make the profound beauty of mathematical precision 
                accessible to every creator, dreamer, and visionary on Earth.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a world where everyone can harness the power of sacred geometry to express 
                their unique vision, connect with others, and contribute to the infinite tapestry of human creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-geo-gradient mb-6">GEO by the Numbers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50K+", label: "Geometric Designs Created", icon: Palette },
              { number: "25K+", label: "Happy Creators Worldwide", icon: Users },
              { number: "100+", label: "Countries Served", icon: Globe },
              { number: "99.9%", label: "Precision Guarantee", icon: Award }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <Card className="p-8 gradient-card hover:shadow-geo transition-all duration-300 border-0">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-geo-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-geo-gradient mb-6">The GEO Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the geometric visionaries behind every perfect pattern
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Geometric Officer",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
                specialty: "Sacred Geometry & Mathematical Design"
              },
              {
                name: "Marcus Rodriguez",
                role: "Lead Pattern Engineer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                specialty: "Algorithmic Pattern Generation"
              },
              {
                name: "Yuki Tanaka",
                role: "Creative Vision Director",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
                specialty: "Aesthetic Harmony & Color Theory"
              }
            ].map((member, index) => (
              <div key={member.name} className="text-center animate-scale-in" style={{animationDelay: `${index * 0.3}s`}}>
                <Card className="p-8 gradient-card hover:shadow-geo transition-all duration-500 transform hover:scale-105 border-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.specialty}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-geo geo-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in">Join the GEO Revolution</h2>
            <p className="text-xl text-white/90 mb-8 animate-slide-up">
              Ready to transform your creative vision with the power of geometric precision?
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
              <Link to="/custom-design">
                <Button size="lg" className="bg-white text-primary hover:bg-yellow-50 transform hover:scale-110 transition-all duration-300 shadow-geo btn-3d text-xl px-12 py-6">
                  <Zap className="mr-3 h-6 w-6" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-110 transition-all duration-300 shadow-geo text-xl px-12 py-6">
                  <Palette className="mr-3 h-6 w-6" />
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
