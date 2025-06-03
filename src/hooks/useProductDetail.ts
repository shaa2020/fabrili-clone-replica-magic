
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export const useProductDetail = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (product: any) => {
    if (!product) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // Type-safe check for colors
    const colors = Array.isArray(product.colors) ? product.colors : [];
    if (colors.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    
    await addToCart(product.id, quantity);
  };

  return {
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    handleAddToCart
  };
};
