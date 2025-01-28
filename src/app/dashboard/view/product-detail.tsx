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
import { Badge } from '@/components/ui/badge';

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
  productName,
  productPrice,
  productDescription,
  productImages,
}: ProductDetailProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          <ImageCarousel productImages={productImages} className="md:m-6" />
        </div>
        <div className="order-2 md:order-2 p-6">
          <CardHeader className="px-0">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {productName}
                </CardTitle>
                <CardDescription className="text-xl font-semibold mt-2">
                  {productPrice}
                </CardDescription>
              </div>
              {/* <Badge variant="secondary">{category}</Badge> */}
            </div>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="px-0">
            <p className="text-gray-600">{productDescription}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
