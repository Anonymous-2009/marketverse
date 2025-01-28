'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  productImages: string[];
  className?: string;
}

export function ImageCarousel({
  productImages,
  className,
}: ImageCarouselProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {productImages.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                    quality={80}
                    priority
                    //  placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
