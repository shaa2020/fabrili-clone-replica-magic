
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedProductsSection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get featured products for display
  const featuredProducts = products.filter(product => product.is_featured).slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-8 sm:h-12 bg-gray-200 rounded-lg w-64 sm:w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded-lg w-48 sm:w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 sm:h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Featured Designs
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Handpicked geometric masterpieces that showcase the art of precision
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="animate-fade-in transform transition-all duration-300 hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                    <GeoProductCard 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.images?.[0] || '/placeholder.svg'}
                      category={product.categories?.name || 'Geometric Art'}
                      isNew={product.is_new || false}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
        
        <div className="text-center mt-8 sm:mt-12 px-4">
          <Link to="/products">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 transform hover:scale-105">
              <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
