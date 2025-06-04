
// Admin panel types - prepared for future Supabase integration
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}

export interface AdminDashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}
