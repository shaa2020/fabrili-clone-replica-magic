import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS': {
      const total = action.payload.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: action.payload, total, itemCount };
    }
    case 'ADD_ITEM': {
      const newItems = [...state.items, action.payload];
      const newTotal = newItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }
    case 'UPDATE_ITEM': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: updatedItems, total: updatedTotal, itemCount: updatedItemCount };
    }
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: filteredItems, total: filteredTotal, itemCount: filteredItemCount };
    }
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addToCart: (product: any, quantity?: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getSessionId: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const loadCartItems = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const sessionId = getSessionId();
      
      // Get cart items based on user login status
      const cartQuery = user 
        ? supabase.from('cart_items').select('*').eq('user_id', user.id)
        : supabase.from('cart_items').select('*').eq('session_id', sessionId);

      const { data: cartData, error } = await cartQuery;

      if (error) {
        console.error('Error loading cart items:', error);
        throw error;
      }

      if (!cartData || cartData.length === 0) {
        dispatch({ type: 'SET_ITEMS', payload: [] });
        return;
      }

      // Get product details
      const productIds = cartData.map(item => item.product_id).filter(Boolean);
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, images')
        .in('id', productIds);

      if (productsError) throw productsError;

      const cartItems: CartItem[] = cartData.map(item => {
        const product = productsData?.find(p => p.id === item.product_id);
        return {
          id: item.id,
          product_id: item.product_id!,
          product_name: product?.name || 'Unknown Product',
          product_price: product?.price || 0,
          product_image: product?.images?.[0] || '/placeholder.svg',
          quantity: item.quantity,
          size: undefined,
          color: undefined,
        };
      });

      dispatch({ type: 'SET_ITEMS', payload: cartItems });
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const mergeGuestCartWithUserCart = async () => {
    if (!user) return;
    
    try {
      const sessionId = getSessionId();
      
      // Get guest cart items
      const { data: guestItems, error: guestError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);

      if (guestError || !guestItems?.length) return;

      // Transfer guest items to user account
      const updates = guestItems.map(item => ({
        ...item,
        user_id: user.id,
        session_id: null
      }));

      await supabase.from('cart_items').delete().eq('session_id', sessionId);
      await supabase.from('cart_items').insert(updates);
      
      // Reload cart items
      await loadCartItems();
    } catch (error) {
      console.error('Error merging guest cart:', error);
    }
  };

  const addToCart = async (product: any, quantity = 1, size?: string, color?: string) => {
    try {
      const sessionId = getSessionId();
      
      const insertData = {
        product_id: product.id,
        user_id: user?.id || null,
        session_id: user ? null : sessionId,
        quantity,
      };

      const { data, error } = await supabase
        .from('cart_items')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      const newItem: CartItem = {
        id: data.id,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.images?.[0] || '/placeholder.svg',
        quantity,
        size,
        color,
      };

      dispatch({ type: 'ADD_ITEM', payload: newItem });
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      dispatch({ type: 'UPDATE_ITEM', payload: { id: itemId, quantity } });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      
      if (user) {
        await supabase.from('cart_items').delete().eq('user_id', user.id);
      } else {
        await supabase.from('cart_items').delete().eq('session_id', sessionId);
      }

      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, [user]);

  // Listen for user sign-in to merge carts
  useEffect(() => {
    const handleUserSignIn = () => {
      mergeGuestCartWithUserCart();
    };

    window.addEventListener('user-signed-in', handleUserSignIn);
    return () => window.removeEventListener('user-signed-in', handleUserSignIn);
  }, [user]);

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getSessionId,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
