'use client';

import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@clerk/nextjs';
import ProductGridSkeleton from '@/components/custom/skeleton/Products-List';

interface Product {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImages: string[];
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();

  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <ProductGridSkeleton />;
  }

  const handleClick = async (productId: number) => {
    try {
      const res = await axios.put('/api/products/cart/add', {
        email: user?.primaryEmailAddress?.emailAddress,
        productId,
      });
      toast({
        title: 'Success',
        description: res.data.message,
      });
      console.log(res.data);
    } catch (error) {
      console.log('Error');
    }
  };

  return (
    <div className="grid gap-8 max-w-6xl mx-auto px-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[400px,1fr] gap-8">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={
                    product.productImages[0] ||
                    '/placeholder.svg?height=224&width=260'
                  }
                  alt={product.productName}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  width={400}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{product.productName}</h2>
                  <p className="text-3xl font-bold text-primary">
                    ₹{product.productPrice.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    {product.productDescription}
                  </p>
                </div>
                <div className="flex gap-4 pt-6">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleClick(product.productId);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      router.push(`/products/${product.productId}`)
                    }
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
