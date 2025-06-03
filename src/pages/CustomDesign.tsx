
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomDesign = () => {
  const [selectedProduct, setSelectedProduct] = useState('t-shirt');
  const [selectedColor, setSelectedColor] = useState('white');

  const products = [
    { id: 't-shirt', name: 'T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
    { id: 'hoodie', name: 'Hoodie', price: 49.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop' },
    { id: 'mug', name: 'Mug', price: 14.99, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop' },
  ];

  const colors = [
    { name: 'white', value: '#FFFFFF' },
    { name: 'black', value: '#000000' },
    { name: 'gray', value: '#6B7280' },
    { name: 'red', value: '#EF4444' },
    { name: 'blue', value: '#3B82F6' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Custom Design Studio</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Design Canvas */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
              <div className="bg-gray-100 rounded-lg p-8 min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-4 relative">
                    <img
                      src={products.find(p => p.id === selectedProduct)?.image}
                      alt="Product preview"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ 
                        filter: selectedColor !== 'white' ? `sepia(1) saturate(2) hue-rotate(${selectedColor === 'black' ? '0' : selectedColor === 'gray' ? '200' : selectedColor === 'red' ? '350' : '200'}deg)` : 'none'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 p-4 rounded-lg text-center">
                        <p className="text-gray-600">Your design will appear here</p>
                        <p className="text-sm text-gray-500 mt-1">Upload images or add text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Design Tools */}
          <div className="space-y-6">
            {/* Product Selection */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Choose Product</h3>
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedProduct === product.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Color Selection */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Choose Color</h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-lg border-2 ${
                      selectedColor === color.name ? 'border-primary' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </Card>

            {/* Design Tools */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Design Tools</h3>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Upload Image
                  </Button>
                  <p className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, SVG
                  </p>
                </TabsContent>
                <TabsContent value="text" className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your text"
                    className="w-full p-2 border rounded-md"
                  />
                  <Button className="w-full" variant="outline">
                    Add Text
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Add to Cart - ${products.find(p => p.id === selectedProduct)?.price}
              </Button>
              <Button variant="outline" className="w-full">
                Save Design
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomDesign;
