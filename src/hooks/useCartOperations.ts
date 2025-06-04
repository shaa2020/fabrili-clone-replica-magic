
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { CartItem } from '@/types/cart';

interface GuestCartItem {
  id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

export const useCartOperations = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      if (user) {
        // Fetch from database for logged-in users
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

        if (error) throw error;
        setItems(data || []);
      } else {
        // Load from localStorage for guest users
        const guestCart = localStorage.getItem('guestCart');
        if (guestCart) {
          const guestItems: GuestCartItem[] = JSON.parse(guestCart);
          
          if (guestItems.length > 0) {
            const productIds = guestItems.map(item => item.product_id);
            const { data: products, error } = await supabase
              .from('products')
              .select('id, name, price, images')
              .in('id', productIds);

            if (error) throw error;

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

            setItems(cartItems);
          } else {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    if (user) {
      try {
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
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
          variant: "destructive",
        });
      }
    } else {
      // Guest user: add to localStorage
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
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
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
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart",
          variant: "destructive",
        });
      }
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
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);

        if (error) throw error;
        await fetchCartItems();
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast({
          title: "Error",
          description: "Failed to update quantity",
          variant: "destructive",
        });
      }
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
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast({
          title: "Error",
          description: "Failed to clear cart",
          variant: "destructive",
        });
      }
    } else {
      localStorage.removeItem('guestCart');
      setItems([]);
    }
  };

  // Fetch cart items when user changes or component mounts
  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return {
    items,
    loading,
    fetchCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
