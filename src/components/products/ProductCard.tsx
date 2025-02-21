'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  productId: number;
  sellerId: string;
  sellerEmail: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter()

  return (
    <Card
      className="relative group transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden rounded-t-lg">
        <img
          src={
            product.productImages[0] || '/placeholder.svg?height=224&width=260'
          }
          alt={product.productName}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300',
            isHovered && 'scale-110'
          )}
        />
        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {product.productName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.productDescription}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{product.productDescription}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mt-3">
          <p className="text-xl font-bold">
            ₹{product.productPrice.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button className="flex-1" variant="default">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button className="flex-1" variant="secondary" onClick={() => router.push(`/products/${product.productId}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
