
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Truck, Wallet } from 'lucide-react';

const checkoutSchema = z.object({
  // Delivery Information
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(11, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  district: z.string().min(2, 'District is required'),
  postalCode: z.string().optional(),
  
  // Payment Information
  paymentMethod: z.enum(['cod', 'bkash', 'nagad', 'rocket', 'upay']),
  paymentNumber: z.string().optional(),
  
  // Additional
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: user?.email || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      district: '',
      postalCode: '',
      paymentMethod: 'cod',
      paymentNumber: '',
      notes: '',
    },
  });

  const watchPaymentMethod = form.watch('paymentMethod');
  const shipping = 150;
  const total = totalPrice + shipping;

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your order",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      // Create order in database
      const orderData = {
        user_id: user.id,
        order_number: `GEO${Date.now()}`,
        status: 'pending',
        payment_status: 'pending',
        payment_method: data.paymentMethod,
        subtotal: totalPrice,
        shipping_amount: shipping,
        total_amount: total,
        currency: 'BDT',
        shipping_address: {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          address_line_1: data.addressLine1,
          address_line_2: data.addressLine2,
          city: data.city,
          district: data.district,
          postal_code: data.postalCode,
        },
        billing_address: {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          address_line_1: data.addressLine1,
          address_line_2: data.addressLine2,
          city: data.city,
          district: data.district,
          postal_code: data.postalCode,
        },
        notes: data.notes,
        payment_reference: data.paymentNumber,
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.products?.price || 0,
        total_price: (item.products?.price || 0) * item.quantity,
        product_name: item.products?.name || 'Product',
        product_sku: '',
        size: 'Standard',
        color: 'Default',
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.order_number} has been placed. We'll contact you soon for confirmation.`,
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

  const paymentMethods = [
    { value: 'cod', label: 'Cash on Delivery', icon: Truck, description: 'Pay when you receive your order' },
    { value: 'bkash', label: 'bKash', icon: Wallet, description: 'Mobile banking payment' },
    { value: 'nagad', label: 'Nagad', icon: Wallet, description: 'Mobile banking payment' },
    { value: 'rocket', label: 'Rocket', icon: Wallet, description: 'Mobile banking payment' },
    { value: 'upay', label: 'Upay', icon: CreditCard, description: 'Mobile banking payment' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Login Required</h1>
            <p className="text-gray-600 mb-8">Please log in to continue with checkout</p>
            <Button onClick={() => navigate('/login')} className="bg-primary hover:bg-primary/90">
              Go to Login
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-4">
            Checkout
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto rounded-full"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Information */}
              <Card className="p-8 shadow-lg border-0 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Truck className="mr-3 text-primary" size={24} />
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="01XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 1 *</FormLabel>
                        <FormControl>
                          <Input placeholder="House/Flat No, Road, Area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Landmark, Building name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dhaka" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dhaka" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-8 shadow-lg border-0 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="mr-3 text-primary" size={24} />
                  Payment Method
                </h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4"
                        >
                          {paymentMethods.map((method) => (
                            <div key={method.value} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value={method.value} id={method.value} />
                              <div className="flex items-center space-x-3 flex-1">
                                <method.icon size={24} className="text-primary" />
                                <div>
                                  <Label htmlFor={method.value} className="font-semibold cursor-pointer">
                                    {method.label}
                                  </Label>
                                  <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchPaymentMethod !== 'cod' && (
                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="paymentNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your mobile banking number" {...field} />
                          </FormControl>
                          <FormMessage />
                          <p className="text-sm text-gray-600 mt-2">
                            We'll send you payment instructions after order confirmation
                          </p>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </Card>

              {/* Additional Notes */}
              <Card className="p-8 shadow-lg border-0 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Notes</h2>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Any special instructions for delivery..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-8 sticky top-32 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.products?.images?.[0] || '/placeholder.svg'}
                        alt={item.products?.name || 'Product'}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.products?.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">৳{((item.products?.price || 0) * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">৳{totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">৳{shipping.toFixed(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                      ৳{total.toFixed(0)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </Card>
            </div>
          </form>
        </Form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
