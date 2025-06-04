
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Flame, ArrowRight, Percent } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SaleSection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get some products for sale display (first 6 products)
  const saleProducts = products.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-8 sm:h-12 bg-gray-200 rounded-lg w-60 sm:w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded-lg w-48 sm:w-60 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 sm:h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
            <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 animate-pulse" />
            <Badge className="bg-red-500 text-white text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2 animate-bounce">
              <Percent className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              SALE
            </Badge>
            <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 sm:mb-6">
            Limited Time Offers
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Don't miss out on these incredible deals on premium geometric designs
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
              {saleProducts.map((product, index) => {
                const originalPrice = Math.round(product.price * 1.4);
                const discountPercentage = Math.floor(Math.random() * 30) + 20;
                
                return (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="animate-fade-in relative" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-red-500 text-white font-bold text-xs sm:text-sm animate-pulse shadow-lg">
                          {discountPercentage}% OFF
                        </Badge>
                      </div>
                      <div className="relative overflow-hidden rounded-lg border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex bg-red-500 text-white hover:bg-red-600" />
            <CarouselNext className="hidden lg:flex bg-red-500 text-white hover:bg-red-600" />
          </Carousel>
        </div>
        
        <div className="text-center mt-8 sm:mt-12 px-4">
          <Link to="/sales">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6">
              <Flame className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Shop All Sale Items
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaleSection;
