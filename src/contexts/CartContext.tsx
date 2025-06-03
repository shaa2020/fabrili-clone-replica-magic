
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

  const totalItems = cartOperations.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartOperations.items.reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0);

  const value = {
    ...cartOperations,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
