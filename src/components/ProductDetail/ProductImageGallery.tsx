
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <div className="mb-4">
        <img
          src={images?.[currentImageIndex] || '/placeholder.svg'}
          alt={productName}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
      {images && images.length > 1 && (
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary'
              }`}
            >
              <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
