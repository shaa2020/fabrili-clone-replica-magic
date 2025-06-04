
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Truck, MapPin, Phone } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type PaymentMethod = Database['public']['Enums']['payment_method'];
type OrderStatus = Database['public']['Enums']['order_status'];
type PaymentStatus = Database['public']['Enums']['payment_status'];

const Checkout = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Delivery Information State
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    instructions: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [paymentReference, setPaymentReference] = useState('');
  const [loading, setLoading] = useState(false);

  // Since cart is removed, we'll show empty cart
  const items: any[] = [];
  const totalPrice = 0;
  const shipping = 150;
  const total = totalPrice + shipping;

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['fullName', 'phone', 'address', 'city'];
    for (const field of required) {
      if (!deliveryInfo[field as keyof typeof deliveryInfo]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (paymentMethod !== 'cod' && paymentMethod !== 'card' && !paymentReference) {
      toast({
        title: "Payment Reference Required",
        description: "Please provide your payment reference/transaction ID",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    toast({
      title: "Cart is Empty",
      description: "Cart functionality has been removed. Please browse our products.",
      variant: "destructive",
    });
    navigate('/products');
  };

  const getPaymentInstructions = () => {
    switch (paymentMethod) {
      case 'bkash':
        return "Send money to: 01XXXXXXXXX (Merchant). Use 'Send Money' option and enter the transaction ID below.";
      case 'nagad':
        return "Send money to: 01XXXXXXXXX (Merchant). Use 'Send Money' option and enter the transaction ID below.";
      case 'rocket':
        return "Send money to: 01XXXXXXXXX-X (Agent). Use 'Send Money' option and enter the transaction ID below.";
      case 'card':
        return "You will be redirected to a secure payment gateway to complete your payment.";
      default:
        return "Pay when your order is delivered to your doorstep.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-4">
            Checkout
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout functionality has been removed</h2>
          <p className="text-gray-600 mb-8">The cart and checkout features are no longer available.</p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Browse Products
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
