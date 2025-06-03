
import type { Tables } from '@/integrations/supabase/types';

export type CartItem = Tables<'cart_items'> & {
  products: {
    name: string;
    price: number;
    images: string[];
  };
};

export interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}
