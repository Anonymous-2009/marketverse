import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  productId: number;
  sellerId: string;
  sellerEmail: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImages: string[];
}

const products: Product[] = [
  // Sample product data
];

const ProductRow = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex overflow-x-auto gap-6 pb-6 px-2">
      {products.map((product) => (
        <Card
          key={product.id}
          className="p-5 shadow-md rounded-xl min-w-[260px] border border-gray-200"
        >
          <img
            src={product.productImages[0]}
            alt={product.productName}
            className="w-full h-52 object-cover rounded-xl"
          />
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-gray-800">
              {product.productName}
            </h3>
            <p className="text-gray-700 font-medium">₹{product.productPrice}</p>
            <div className="flex gap-3 mt-4">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                variant="default"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
              </Button>
              <Button
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                variant="outline"
              >
                <Eye className="mr-2 h-5 w-5" /> View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Products</h2>
      <div className="space-y-8">
        <ProductRow products={products.slice(0, 10)} />
        <ProductRow products={products.slice(10, 17)} />
        <ProductRow products={products.slice(17)} />
      </div>
    </div>
  );
};

export default ProductGrid;
