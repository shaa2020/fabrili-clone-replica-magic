
import React, { createContext, useContext, useEffect } from 'react';
import { useCartOperations } from '@/hooks/useCartOperations';
import { useAuth } from '@/contexts/AuthContext';
import type { CartContextType } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const cartOperations = useCartOperations();

  useEffect(() => {
    cartOperations.fetchCartItems();
  }, [user]);

  // Calculate totals with proper fallbacks
  const totalItems = cartOperations.items?.reduce((sum, item) => {
    return sum + (item?.quantity || 0);
  }, 0) || 0;
  
  const totalPrice = cartOperations.items?.reduce((sum, item) => {
    const price = item?.products?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0) || 0;

  const value = {
    ...cartOperations,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
