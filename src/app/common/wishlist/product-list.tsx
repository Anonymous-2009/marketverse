'use client';
import axios from 'axios';
import { ProductDetail } from './product-detail';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

interface ProductListProps {
  email: string;
}

export function ProductList({ email }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]); // Explicitly type the state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('/api/products/wishlist/fetch', {
          email,
        }); // Pass email as an object
        // console.log(response.data.products);
        setProducts(response.data.products); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
        // You can add an alert or toast notification here if needed
      }
    };

    fetchProducts();
  }, [email]); // Dependency array listens for changes in email

  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your WishList in MarketVerse</h1>
      <div className="space-y-12">
        {!products || products.length === 0 ? (
          <div>
            <p className="text-xl text-gray-600">No products listed yet.</p>
            <Link href="/products/explore">
              <Button variant="link" className="mt-4">
                Click here to explore product
              </Button>
            </Link>
          </div>
        ) : (
          products.map((product) => (
            <ProductDetail key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
}
