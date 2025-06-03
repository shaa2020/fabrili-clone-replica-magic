
import { Link } from 'react-router-dom';

interface ProductBreadcrumbProps {
  productName: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      <span>/</span>
      <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
      <span>/</span>
      <span className="text-gray-900">{productName}</span>
    </div>
  );
};

export default ProductBreadcrumb;
