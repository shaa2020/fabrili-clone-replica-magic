
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useCategories } from '@/hooks/useProducts';

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
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
  );
};

export default CategoriesSection;
