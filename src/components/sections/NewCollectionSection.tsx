
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GeoProductCard from '@/components/GeoProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Star, Sparkles, ArrowRight, Crown, Zap, Gem } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewCollectionSection = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Get new collection products (latest products)
  const newCollectionProducts = products.filter(product => product.is_new).slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
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
    <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-indigo-200/30 transform rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="h-8 w-8 text-purple-600 animate-pulse" />
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg px-4 py-2 animate-bounce">
              <Gem className="h-4 w-4 mr-1" />
              NEW COLLECTION
            </Badge>
            <Crown className="h-8 w-8 text-purple-600 animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mb-6">
            Exclusive New Arrivals
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Discover our latest geometric masterpieces, crafted with precision and designed to inspire
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Limited Edition</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-gray-700">Handcrafted</span>
            </div>
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
              {newCollectionProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="animate-fade-in relative" style={{animationDelay: `${index * 0.1}s`}}>
                    {/* New collection badge overlay */}
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-sm animate-pulse shadow-lg">
                        NEW
                      </Badge>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border-2 border-purple-200 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:rotate-1" style={{ boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 10px 25px -10px rgba(99, 102, 241, 0.15)' }}>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg" />
            <CarouselNext className="hidden md:flex bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg" />
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-xl px-12 py-6" style={{ filter: 'drop-shadow(0 8px 16px rgba(147, 51, 234, 0.3))' }}>
              <Sparkles className="mr-3 h-6 w-6" />
              Explore New Collection
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewCollectionSection;
