
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryProducts = {
    't-shirts': [
      { id: '1', name: 'Classic T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: 'T-Shirts' },
      { id: '5', name: 'Graphic T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop', category: 'T-Shirts' },
      { id: '9', name: 'V-Neck T-Shirt', price: 26.99, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop', category: 'T-Shirts' },
    ],
    'hoodies': [
      { id: '2', name: 'Premium Hoodie', price: 49.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', category: 'Hoodies' },
      { id: '6', name: 'Zip Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', category: 'Hoodies' },
    ],
    'mugs': [
      { id: '3', name: 'Coffee Mug', price: 14.99, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop', category: 'Mugs' },
      { id: '7', name: 'Travel Mug', price: 19.99, image: 'https://images.unsplash.com/photo-1545662985-d1e9f03b3093?w=400&h=400&fit=crop', category: 'Mugs' },
    ],
    'bags': [
      { id: '4', name: 'Tote Bag', price: 19.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: 'Bags' },
      { id: '8', name: 'Canvas Bag', price: 24.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', category: 'Bags' },
    ]
  };

  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
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
