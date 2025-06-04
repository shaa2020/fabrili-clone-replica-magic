
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Crown, Zap, Gem } from 'lucide-react';

const NewCollection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get new collection products (latest products)
  const newCollectionProducts = products.filter(product => product.is_new);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg animate-pulse">Loading new collection...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 transform rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="h-12 w-12 animate-pulse" />
            <Badge className="bg-white text-purple-600 text-2xl px-6 py-3 animate-bounce">
              <Gem className="h-6 w-6 mr-2" />
              NEW COLLECTION
            </Badge>
            <Crown className="h-12 w-12 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Exclusive New Arrivals
          </h1>
          
          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8 animate-slide-up">
            Discover our latest geometric masterpieces, crafted with precision and designed to inspire
          </p>
          
          <div className="flex items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              <span>Limited Edition</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <span>Handcrafted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mb-6">
              New Collection
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Explore our newest geometric designs that push the boundaries of creativity
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newCollectionProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in transform transition-all duration-300 hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden rounded-lg border-2 border-purple-200 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10"></div>
                  <GeoProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images?.[0] || '/placeholder.svg'}
                    category={product.categories?.name || 'Geometric Art'}
                    isNew={product.is_new || false}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {newCollectionProducts.length === 0 && (
            <div className="text-center py-20">
              <Crown className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No New Items Available</h3>
              <p className="text-gray-600">Check back soon for exciting new arrivals!</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewCollection;
