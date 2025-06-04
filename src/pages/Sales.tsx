
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Flame, Percent, Star, Clock } from 'lucide-react';

const Sales = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get all products for sale display
  const saleProducts = products.slice(0, 12);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg animate-pulse">Loading sale items...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 transform rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Flame className="h-12 w-12 animate-pulse" />
            <Badge className="bg-white text-red-500 text-2xl px-6 py-3 animate-bounce">
              <Percent className="h-6 w-6 mr-2" />
              MEGA SALE
            </Badge>
            <Flame className="h-12 w-12 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Unbeatable Deals on GEO Designs
          </h1>
          
          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8 animate-slide-up">
            Save up to 50% on our premium geometric collection. Limited time offers on handpicked designs!
          </p>
          
          <div className="flex items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span>Limited Time</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-6 w-6" />
              <span>Up to 50% Off</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-6">
              Sale Products
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover incredible savings on our most popular geometric designs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {saleProducts.map((product, index) => {
              const originalPrice = Math.round(product.price * 1.4); // 40% markup for original price
              const discountPercentage = Math.floor(Math.random() * 30) + 20; // 20-50% discount
              
              return (
                <div key={product.id} className="animate-fade-in relative" style={{animationDelay: `${index * 0.1}s`}}>
                  {/* Sale badge overlay */}
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-red-500 text-white font-bold text-sm animate-pulse shadow-lg">
                      {discountPercentage}% OFF
                    </Badge>
                  </div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-orange-500/10"></div>
                    <GeoProductCard 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={originalPrice}
                      isOnSale={true}
                      image={product.images?.[0] || '/placeholder.svg'}
                      category={product.categories?.name || 'Geometric Art'}
                      isNew={product.is_new || false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {saleProducts.length === 0 && (
            <div className="text-center py-20">
              <Flame className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Sale Items Available</h3>
              <p className="text-gray-600">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Sales;
