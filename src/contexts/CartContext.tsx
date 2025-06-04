
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { CartItem, CartContextType } from '@/types/cart';

interface GuestCartItem {
  id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    // Return default values instead of throwing to prevent crashes
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
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      if (user) {
        console.log('Fetching cart for authenticated user:', user.id);
        const { data, error } = await supabase
          .from('cart_items')
          .select(`
            *,
            products (
              name,
              price,
              images
            )
          `)
          .eq('user_id', user.id);

        if (error) {
          console.error('Database error:', error);
          setItems([]);
        } else {
          console.log('Database cart data:', data);
          setItems(data || []);
        }
      } else {
        console.log('Fetching cart for guest user');
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart) {
          const guestItems: GuestCartItem[] = JSON.parse(guestCart);
          console.log('Guest cart items:', guestItems);
          
          if (guestItems.length > 0) {
            const productIds = guestItems.map(item => item.product_id);
            const { data: products, error } = await supabase
              .from('products')
              .select('id, name, price, images')
              .in('id', productIds);

            if (error) {
              console.error('Product fetch error:', error);
              setItems([]);
            } else {
              const cartItems: CartItem[] = guestItems.map(guestItem => {
                const product = products?.find(p => p.id === guestItem.product_id);
                return {
                  id: guestItem.id,
                  user_id: null,
                  product_id: guestItem.product_id,
                  quantity: guestItem.quantity,
                  created_at: guestItem.created_at,
                  updated_at: guestItem.created_at,
                  variant_id: null,
                  products: product ? {
                    name: product.name,
                    price: product.price,
                    images: product.images || []
                  } : null
                } as CartItem;
              });
              console.log('Processed guest cart items:', cartItems);
              setItems(cartItems);
            }
          } else {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      }
    } catch (error) {
      console.error('Cart fetch error:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      if (user) {
        const existingItem = items.find(item => item.product_id === productId);

        if (existingItem) {
          await updateQuantity(existingItem.id, existingItem.quantity + quantity);
        } else {
          const { error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: productId,
              quantity
            });

          if (error) throw error;
          await fetchCartItems();
        }

        toast({
          title: "Added to cart",
          description: "Item has been added to your cart",
        });
      } else {
        const guestCart = localStorage.getItem('guestCart');
        let guestItems: GuestCartItem[] = guestCart ? JSON.parse(guestCart) : [];
        
        const existingItemIndex = guestItems.findIndex(item => item.product_id === productId);
        
        if (existingItemIndex >= 0) {
          guestItems[existingItemIndex].quantity += quantity;
        } else {
          const newItem: GuestCartItem = {
            id: `guest_${Date.now()}_${Math.random()}`,
            product_id: productId,
            quantity,
            created_at: new Date().toISOString()
          };
          guestItems.push(newItem);
        }
        
        localStorage.setItem('guestCart', JSON.stringify(guestItems));
        await fetchCartItems();
        
        toast({
          title: "Added to cart",
          description: "Item has been added to your cart",
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) throw error;
        await fetchCartItems();
        
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart",
        });
      } else {
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart) {
          let guestItems: GuestCartItem[] = JSON.parse(guestCart);
          guestItems = guestItems.filter(item => item.id !== itemId);
          localStorage.setItem('guestCart', JSON.stringify(guestItems));
          await fetchCartItems();
          
          toast({
            title: "Removed from cart",
            description: "Item has been removed from your cart",
          });
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);

        if (error) throw error;
        await fetchCartItems();
      } else {
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart) {
          let guestItems: GuestCartItem[] = JSON.parse(guestCart);
          const itemIndex = guestItems.findIndex(item => item.id === itemId);
          
          if (itemIndex >= 0) {
            guestItems[itemIndex].quantity = quantity;
            localStorage.setItem('guestCart', JSON.stringify(guestItems));
            await fetchCartItems();
          }
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setItems([]);
      } else {
        localStorage.removeItem('guestCart');
        setItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => {
    return sum + (item?.quantity || 0);
  }, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const price = item?.products?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  // Load cart data when user changes or component mounts
  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const value = {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
