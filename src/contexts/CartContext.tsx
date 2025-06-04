
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useCartOperations } from '@/hooks/useCartOperations';
import { useAuth } from '@/contexts/AuthContext';
import type { CartContextType } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.warn('useCart must be used within a CartProvider');
    return {
      items: [],
      loading: false,
      addToCart: async () => {},
      removeFromCart: async () => {},
      updateQuantity: async () => {},
      clearCart: async () => {},
      totalItems: 0,
      totalPrice: 0,
    };
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const cartOperations = useCartOperations();
  const initialLoadRef = useRef(false);

  useEffect(() => {
    // Only fetch cart items on initial load or when user authentication state is fully resolved
    if (!initialLoadRef.current) {
      console.log('CartProvider: Initial cart fetch');
      if (cartOperations.fetchCartItems) {
        cartOperations.fetchCartItems();
      }
      initialLoadRef.current = true;
    }
  }, []);

  // Separate effect for user-specific cart operations (like syncing guest cart)
  useEffect(() => {
    if (initialLoadRef.current && user !== undefined) {
      console.log('CartProvider: User state changed, checking for cart sync');
      // Only refetch if user is logged in and we need to sync
      if (user && cartOperations.fetchCartItems) {
        cartOperations.fetchCartItems();
      }
    }
  }, [user]);

  // Calculate totals with proper null checks
  const totalItems = cartOperations.items?.reduce((sum, item) => {
    const quantity = item?.quantity || 0;
    return sum + quantity;
  }, 0) || 0;
  
  const totalPrice = cartOperations.items?.reduce((sum, item) => {
    const price = item?.products?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0) || 0;

  console.log('CartProvider Debug:', {
    items: cartOperations.items,
    totalItems,
    totalPrice,
    itemsLength: cartOperations.items?.length || 0,
    loading: cartOperations.loading
  });

  const value = {
    ...cartOperations,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
