
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProducts';
import { useProductDetail } from '@/hooks/useProductDetail';
import ProductBreadcrumb from '@/components/ProductDetail/ProductBreadcrumb';
import ProductImageGallery from '@/components/ProductDetail/ProductImageGallery';
import ProductInfo from '@/components/ProductDetail/ProductInfo';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || '');
  const {
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    handleAddToCart
  } = useProductDetail();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading product...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product not found</h2>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary">
                Browse Products
              </Button>
            </Link>
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
        <ProductBreadcrumb productName={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery 
            images={product.images || []} 
            productName={product.name} 
          />

          {/* Product Info */}
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={() => handleAddToCart(product)}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
