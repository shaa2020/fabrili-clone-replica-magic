
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
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-60 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-orange-200/30 transform rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flame className="h-8 w-8 text-red-500 animate-pulse" />
            <Badge className="bg-red-500 text-white text-lg px-4 py-2 animate-bounce">
              <Percent className="h-4 w-4 mr-1" />
              SALE
            </Badge>
            <Flame className="h-8 w-8 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-6">
            Limited Time Offers
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
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
              {saleProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="animate-fade-in relative" style={{animationDelay: `${index * 0.1}s`}}>
                    {/* Sale badge overlay */}
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-red-500 text-white font-bold text-sm animate-pulse">
                        25% OFF
                      </Badge>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-orange-500/10"></div>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-red-500 text-white hover:bg-red-600" />
            <CarouselNext className="hidden md:flex bg-red-500 text-white hover:bg-red-600" />
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xl px-12 py-6">
              <Flame className="mr-3 h-6 w-6" />
              Shop All Sale Items
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaleSection;
