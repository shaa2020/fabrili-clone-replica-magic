
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const handleSSLCommerzPayment = () => {
    // SSLCommerz integration will be added after Supabase setup
    alert('SSLCommerz payment integration will be implemented with backend setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-4">
            Shopping Cart
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto rounded-full"></div>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-20 opacity-0 animate-scale-in delay-200">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover amazing products and start shopping!</p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <Card key={item.id} className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl opacity-0 animate-fade-in" style={{animationDelay: `${(index + 1) * 0.1}s`}}>
                  <div className="flex items-center space-x-6">
                    <div className="relative group">
                      <img
                        src={item.products?.images?.[0] || '/placeholder.svg'}
                        alt={item.products?.name || 'Product'}
                        className="w-24 h-24 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-2">{item.products?.name || 'Product'}</h3>
                      <p className="text-gray-600 mb-1">Size: Standard</p>
                      <p className="text-gray-600 mb-3">Color: Default</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                        ৳{item.products?.price || 0}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800 mb-2">
                        ৳{((item.products?.price || 0) * item.quantity).toFixed(0)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-8 sticky top-32 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 animate-scale-in delay-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">৳{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">৳{shipping.toFixed(0)}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                        ৳{total.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSSLCommerzPayment}
                  className="w-full mt-8 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
                >
                  Pay with SSLCommerz
                </Button>
                <Link to="/products" className="block mt-4">
                  <Button variant="outline" className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
