
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Sparkles } from 'lucide-react';

const FeaturedProductsSection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get featured products for display
  const featuredProducts = products.filter(product => product.is_featured).slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
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
  );
};

export default FeaturedProductsSection;
