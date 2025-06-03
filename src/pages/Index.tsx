
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { Sparkles, Zap, Palette, Shield, Clock, Award } from 'lucide-react';

const Index = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Get featured products for display
  const featuredProducts = products.filter(product => product.is_featured).slice(0, 4);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg animate-pulse">Loading amazing GEO products...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-geo animate-gradient min-h-[80vh] flex items-center geo-pattern">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="animate-float mb-8">
              <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-geo-lg">
                <span className="text-6xl font-bold text-white">G</span>
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
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-geo btn-3d text-xl px-12 py-6 border-2 border-white">
                  <Palette className="mr-3 h-6 w-6" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black backdrop-blur-sm transform hover:scale-110 transition-all duration-300 shadow-geo text-xl px-12 py-6">
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

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-geo-gradient mb-6">Why Choose GEO?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of geometric precision and creative freedom</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
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
            ].map((feature, index) => (
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

      {/* Enhanced Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-geo-gradient mb-6">Geometric Collections</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our carefully curated collections of geometric designs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/category/${category.slug}`} className="group animate-scale-in" style={{animationDelay: `${index * 0.15}s`}}>
                <Card className="overflow-hidden hover:shadow-geo-lg transition-all duration-500 transform hover:scale-105 border-0 gradient-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image_url || '/placeholder.svg'}
                      alt={category.name}
                      className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-geo opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-2xl font-bold mb-2">GEO {category.name}</h3>
                      <p className="text-white/80 text-sm">Geometric {category.name.toLowerCase()} collection</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-geo-gradient mb-6">Featured GEO Designs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked geometric masterpieces that showcase the art of precision</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <GeoProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images?.[0] || '/placeholder.svg'}
                  category={product.categories?.name || 'Geometric Art'}
                  isNew={product.is_new || false}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-gradient-geo hover:bg-gradient-geo-dark text-white shadow-geo hover:shadow-geo-lg transform hover:scale-105 transition-all duration-300 text-xl px-12 py-6 btn-3d">
                <Sparkles className="mr-3 h-6 w-6" />
                Explore All GEO Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      <Footer />
    </div>
  );
};

export default Index;
