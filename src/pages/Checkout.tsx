
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
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
  const { items, clearCart, totalPrice } = useCart();
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
    if (!validateForm()) return;

    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Generate order number
      const orderNumber = `GEO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Prepare order data with correct types
      const orderStatus: OrderStatus = 'pending';
      const paymentStatus: PaymentStatus = paymentMethod === 'cod' ? 'pending' : 'paid';
      
      const orderData = {
        user_id: user?.id || null,
        order_number: orderNumber,
        status: orderStatus,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        subtotal: totalPrice,
        shipping_amount: shipping,
        total_amount: total,
        currency: 'BDT',
        shipping_address: {
          fullName: deliveryInfo.fullName,
          phone: deliveryInfo.phone,
          email: deliveryInfo.email,
          address: deliveryInfo.address,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode,
          instructions: deliveryInfo.instructions
        },
        billing_address: {
          fullName: deliveryInfo.fullName,
          phone: deliveryInfo.phone,
          email: deliveryInfo.email,
          address: deliveryInfo.address,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode
        },
        payment_reference: paymentReference || null,
        notes: deliveryInfo.instructions || null
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items with required fields
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.products?.name || 'Unknown Product',
        quantity: item.quantity,
        unit_price: item.products?.price || 0,
        total_price: (item.products?.price || 0) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderNumber} has been placed successfully.`,
      });

      // Redirect to success page
      navigate(`/order-success?order=${orderNumber}`);

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
            <Card className="p-8 shadow-lg border-0 rounded-2xl opacity-0 animate-scale-in delay-200">
              <div className="flex items-center mb-6">
                <MapPin className="text-primary mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={deliveryInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="mt-2"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={deliveryInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city" className="text-gray-700 font-medium">City *</Label>
                  <Input
                    id="city"
                    value={deliveryInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-2"
                    placeholder="Dhaka"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2"
                    placeholder="House/Flat no, Road, Area, Thana"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="postalCode" className="text-gray-700 font-medium">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={deliveryInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="mt-2"
                    placeholder="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instructions" className="text-gray-700 font-medium">Delivery Instructions</Label>
                  <Input
                    id="instructions"
                    value={deliveryInfo.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className="mt-2"
                    placeholder="Any special instructions"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-8 shadow-lg border-0 rounded-2xl opacity-0 animate-scale-in delay-400">
              <div className="flex items-center mb-6">
                <CreditCard className="text-primary mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
              </div>
              
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="text-lg font-medium cursor-pointer">Cash on Delivery</Label>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                    <Truck className="text-green-600" size={20} />
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="bkash" id="bkash" />
                    <div className="flex-1">
                      <Label htmlFor="bkash" className="text-lg font-medium cursor-pointer">bKash</Label>
                      <p className="text-sm text-gray-600">Mobile banking payment</p>
                    </div>
                    <div className="w-12 h-8 bg-pink-600 rounded flex items-center justify-center text-white text-xs font-bold">bK</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <div className="flex-1">
                      <Label htmlFor="nagad" className="text-lg font-medium cursor-pointer">Nagad</Label>
                      <p className="text-sm text-gray-600">Digital financial service</p>
                    </div>
                    <div className="w-12 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">N</div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="rocket" id="rocket" />
                    <div className="flex-1">
                      <Label htmlFor="rocket" className="text-lg font-medium cursor-pointer">Rocket</Label>
                      <p className="text-sm text-gray-600">DBBL mobile banking</p>
                    </div>
                    <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">R</div>
                  </div>
                </div>
              </RadioGroup>
              
              {/* Payment Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Payment Instructions:</h3>
                <p className="text-sm text-gray-600">{getPaymentInstructions()}</p>
              </div>
              
              {/* Payment Reference Input for Mobile Banking */}
              {paymentMethod !== 'cod' && paymentMethod !== 'card' && (
                <div className="mt-6">
                  <Label htmlFor="paymentReference" className="text-gray-700 font-medium">
                    Transaction ID / Reference *
                  </Label>
                  <Input
                    id="paymentReference"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    className="mt-2"
                    placeholder="Enter your transaction ID"
                  />
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-8 sticky top-32 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 animate-scale-in delay-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.products?.images?.[0] || '/placeholder.svg'}
                      alt={item.products?.name || 'Product'}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.products?.name}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">৳{((item.products?.price || 0) * item.quantity).toFixed(0)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">৳{totalPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">৳{shipping.toFixed(0)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                      ৳{total.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handlePlaceOrder}
                disabled={loading || items.length === 0}
                className="w-full mt-8 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </Button>
              
              {/* Security Note */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Phone className="text-green-600 mr-2" size={16} />
                  <p className="text-sm text-green-800 font-medium">Secure Checkout</p>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  We'll call you within 30 minutes to confirm your order
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
