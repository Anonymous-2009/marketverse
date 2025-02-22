'use client';
import { ImageCarousel } from './image-carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useUser } from '@clerk/nextjs';
import SkeletonLoader from '@/components/custom/skeleton/Product-Skeleton';

interface ProductDetailProps {
  id: number;
  productId: number;
  sellerId: string;
  sellerEmail: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImages: string[];
}

export function ProductDetail({
  productId,
  productName,
  productPrice,
  productDescription,
  productImages,
}: ProductDetailProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <SkeletonLoader />;
  }

  const { toast } = useToast();

  // Remove product from cart
  const handleRemoveFromWishlist = async () => {
    try {
      const response = await axios.delete('/api/products/wishlist/remove', {
        data: {
          email: user?.primaryEmailAddress?.emailAddress,
          productId,
        },
      });

      toast({
        title: 'Removed from Cart',
        description: response.data.message,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not remove item from cart.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // Buy Now action
  const handleToCart = async () => {
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
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          <ImageCarousel productImages={productImages} className="md:m-6" />
        </div>
        <div className="order-2 md:order-2 p-6 flex flex-col justify-between">
          <div>
            <CardHeader className="px-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {productName}
                  </CardTitle>
                  <CardDescription className="text-xl font-semibold mt-2">
                    ₹{productPrice}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="px-0">
              <p className="text-gray-600">{productDescription}</p>
            </CardContent>
          </div>

          {/* Buttons for Cart & Purchase */}
          <div className="mt-8 flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleRemoveFromWishlist}
            >
              Remove from Wish:List
            </Button>
            <Button
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
