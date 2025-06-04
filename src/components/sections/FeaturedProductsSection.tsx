
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
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-6">
            Featured GEO Designs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked geometric masterpieces that showcase the art of precision
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Curated by <span className="text-primary font-semibold">Shanto</span>
          </div>
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
                  <div className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
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
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xl px-12 py-6">
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
