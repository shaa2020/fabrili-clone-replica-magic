
// Admin utility functions - prepared for future Supabase integration
import { AdminDashboardStats } from '@/types/admin';

export const formatCurrency = (amount: number): string => {
  return `৳${amount.toLocaleString()}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateGrowthPercentage = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const mockAdminStats: AdminDashboardStats = {
  totalProducts: 150,
  totalOrders: 1250,
  totalRevenue: 125000,
  totalUsers: 5000,
};

// Note: These functions will be replaced with actual Supabase queries once connected
export const getAdminStats = async (): Promise<AdminDashboardStats> => {
  // This will be replaced with actual Supabase queries
  return mockAdminStats;
};

export const checkAdminPermissions = (userRole: string): boolean => {
  return ['admin', 'moderator'].includes(userRole);
};
