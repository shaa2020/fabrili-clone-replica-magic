
import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Package, Phone, Mail, AlertCircle } from 'lucide-react';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = searchParams.get('order');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // If no order number is provided, redirect to home after a delay
    if (!orderNumber) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [orderNumber, navigate]);

  // Don't render anything until component is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state if no order number
  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={48} className="text-orange-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Order Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We couldn't find your order information. You'll be redirected to the home page shortly.
            </p>

            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} className="text-green-600" />
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="p-8 shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Package className="text-primary mr-3" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order #{orderNumber}</h2>
                <p className="text-gray-600">Your order has been confirmed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Phone className="mx-auto mb-3 text-blue-600" size={24} />
                <h3 className="font-semibold text-gray-800 mb-2">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  We'll call you within 30 minutes to confirm your order details
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <Mail className="mx-auto mb-3 text-green-600" size={24} />
                <h3 className="font-semibold text-gray-800 mb-2">Order Updates</h3>
                <p className="text-sm text-gray-600">
                  You'll receive SMS updates about your order status
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Our team will call you to confirm your order</li>
                <li>• Your order will be processed within 24 hours</li>
                <li>• Delivery will be completed within 3-5 business days</li>
                <li>• You'll receive tracking information via SMS</li>
              </ul>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/products">
              <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="px-8 py-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gray-100 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you have any questions about your order, feel free to contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
              <a href="tel:+8801XXXXXXXXX" className="text-primary hover:underline transition-colors">
                📞 +880 1XXX-XXXXXX
              </a>
              <a href="mailto:support@geo-threads.com" className="text-primary hover:underline transition-colors">
                ✉️ support@geo-threads.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
