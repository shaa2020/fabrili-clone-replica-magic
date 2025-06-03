
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoProductCard from '@/components/GeoProductCard';
import { useProductsByCategory } from '@/hooks/useProducts';

const CategoryPage = () => {
  const { category } = useParams();
  const { data: products = [], isLoading } = useProductsByCategory(category || '');

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1).replace('-', ' ');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading products...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">GEO {categoryName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <GeoProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || '/placeholder.svg'}
              category={product.categories?.name || 'Uncategorized'}
              isNew={product.is_new || false}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
