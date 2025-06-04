
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
import { generateTransactionId, initializeSSLCommerz } from '@/utils/sslcommerz';

const Checkout = () => {
  const { user } = useAuth();
  const { state: cartState, clearCart, getSessionId } = useCart();
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
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [paymentReference, setPaymentReference] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = cartState.total;
  const shipping = 150;
  const total = subtotal + shipping;

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

    if (['bkash', 'nagad', 'rocket'].includes(paymentMethod) && !paymentReference) {
      toast({
        title: "Payment Reference Required",
        description: "Please provide your payment reference/transaction ID",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSSLCommerzPayment = async (orderId: string) => {
    const transactionId = generateTransactionId();
    
    const sslConfig = {
      store_id: 'test_store', // Replace with actual store ID
      store_passwd: 'test_password', // Replace with actual password
      total_amount: total,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${window.location.origin}/order-success?order=${orderId}`,
      fail_url: `${window.location.origin}/checkout?failed=true`,
      cancel_url: `${window.location.origin}/checkout?cancelled=true`,
      product_name: 'E-commerce Order',
      product_category: 'General',
      product_profile: 'general',
      shipping_method: 'Courier',
      num_of_item: cartState.itemCount,
      cus_name: deliveryInfo.fullName,
      cus_email: deliveryInfo.email,
      cus_add1: deliveryInfo.address,
      cus_city: deliveryInfo.city,
      cus_postcode: deliveryInfo.postalCode || '1000',
      cus_country: 'Bangladesh',
      cus_phone: deliveryInfo.phone,
    };

    try {
      await initializeSSLCommerz(sslConfig);
    } catch (error) {
      console.error('SSLCommerz initialization failed:', error);
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (cartState.items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some items before checkout.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create order
      const orderData = {
        user_id: user?.id || null,
        session_id: user ? null : getSessionId(),
        customer_name: deliveryInfo.fullName,
        customer_email: deliveryInfo.email,
        customer_phone: deliveryInfo.phone,
        delivery_address: {
          address: deliveryInfo.address,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode,
          instructions: deliveryInfo.instructions
        },
        subtotal: subtotal,
        shipping_cost: shipping,
        total_amount: total,
        payment_method: paymentMethod,
        payment_reference: paymentReference || null,
        order_status: 'pending',
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending',
        notes: deliveryInfo.instructions
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartState.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.product_price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        total_price: item.product_price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Handle payment method
      if (paymentMethod === 'sslcommerz') {
        await handleSSLCommerzPayment(order.id);
        return; // SSLCommerz will redirect
      }

      // Clear cart and redirect
      await clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.order_number} has been placed.`,
      });

      navigate(`/order-success?order=${order.order_number}`);
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
      case 'sslcommerz':
        return "You will be redirected to a secure payment gateway to complete your payment.";
      default:
        return "Pay when your order is delivered to your doorstep.";
    }
  };

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
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
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Delivery Information */}
            <Card className="p-6 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-6">
                <Truck className="text-primary mr-3" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Delivery Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={deliveryInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={deliveryInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={deliveryInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={deliveryInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="instructions">Delivery Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={deliveryInfo.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-6">
                <CreditCard className="text-primary mr-3" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
              </div>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="bkash" id="bkash" />
                    <Label htmlFor="bkash" className="flex-1">bKash</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <Label htmlFor="nagad" className="flex-1">Nagad</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="rocket" id="rocket" />
                    <Label htmlFor="rocket" className="flex-1">Rocket</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                    <Label htmlFor="sslcommerz" className="flex-1">Credit/Debit Card (SSLCommerz)</Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Payment Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{getPaymentInstructions()}</p>
              </div>

              {/* Payment Reference Input */}
              {['bkash', 'nagad', 'rocket'].includes(paymentMethod) && (
                <div className="mt-4">
                  <Label htmlFor="paymentReference">Transaction ID *</Label>
                  <Input
                    id="paymentReference"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="Enter your transaction ID"
                    className="mt-1"
                  />
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="p-6 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product_name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">৳{(item.product_price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'Placing Order...' : `Place Order - ৳${total.toFixed(2)}`}
              </Button>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
