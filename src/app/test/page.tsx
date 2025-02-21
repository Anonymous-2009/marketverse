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
import { ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

// ... products array remains the same ...

const products: Product[] = [
  {
    id: 1,
    productId: 10001,
    sellerId: 'SELLER12345',
    sellerEmail: 'seller@example.com',
    productName: 'Wireless Headphones',
    productPrice: 2999,
    productDescription:
      'High-quality wireless headphones with noise cancellation and long battery life.',
    productImages: [
      'https://example.com/images/headphones1.jpg',
      'https://example.com/images/headphones2.jpg',
    ],
  },
  {
    id: 2,
    productId: 10002,
    sellerId: 'SELLER67890',
    sellerEmail: 'store@example.com',
    productName: 'Gaming Mouse',
    productPrice: 1599,
    productDescription:
      'Ergonomic gaming mouse with customizable RGB lighting and adjustable DPI.',
    productImages: [
      'https://example.com/images/mouse1.jpg',
      'https://example.com/images/mouse2.jpg',
    ],
  },
  {
    id: 3,
    productId: 10003,
    sellerId: 'SELLER54321',
    sellerEmail: 'shop@example.com',
    productName: 'Mechanical Keyboard',
    productPrice: 4499,
    productDescription:
      'Compact mechanical keyboard with hot-swappable keys and RGB backlighting.',
    productImages: [
      'https://example.com/images/keyboard1.jpg',
      'https://example.com/images/keyboard2.jpg',
    ],
  },
  {
    id: 4,
    productId: 10004,
    sellerId: 'SELLER98765',
    sellerEmail: 'tech@example.com',
    productName: '4K Webcam',
    productPrice: 5999,
    productDescription:
      'Professional 4K webcam with auto-focus and built-in microphone array.',
    productImages: [
      'https://example.com/images/webcam1.jpg',
      'https://example.com/images/webcam2.jpg',
    ],
  },
  {
    id: 5,
    productId: 10005,
    sellerId: 'SELLER24680',
    sellerEmail: 'gadgets@example.com',
    productName: 'USB-C Hub',
    productPrice: 1999,
    productDescription:
      '10-in-1 USB-C hub with HDMI, ethernet, and power delivery.',
    productImages: [
      'https://example.com/images/hub1.jpg',
      'https://example.com/images/hub2.jpg',
    ],
  },
  {
    id: 6,
    productId: 10006,
    sellerId: 'SELLER13579',
    sellerEmail: 'electronics@example.com',
    productName: 'Wireless Charger',
    productPrice: 1299,
    productDescription:
      '15W fast wireless charger with iPhone and Android compatibility.',
    productImages: [
      'https://example.com/images/charger1.jpg',
      'https://example.com/images/charger2.jpg',
    ],
  },
  {
    id: 7,
    productId: 10007,
    sellerId: 'SELLER11111',
    sellerEmail: 'peripherals@example.com',
    productName: 'Drawing Tablet',
    productPrice: 7999,
    productDescription:
      'Professional drawing tablet with 8192 pressure levels and tilt support.',
    productImages: [
      'https://example.com/images/tablet1.jpg',
      'https://example.com/images/tablet2.jpg',
    ],
  },
  {
    id: 8,
    productId: 10008,
    sellerId: 'SELLER22222',
    sellerEmail: 'audio@example.com',
    productName: 'USB Microphone',
    productPrice: 3499,
    productDescription:
      'Studio-quality USB condenser microphone with multiple pickup patterns.',
    productImages: [
      'https://example.com/images/mic1.jpg',
      'https://example.com/images/mic2.jpg',
    ],
  },
  {
    id: 9,
    productId: 10009,
    sellerId: 'SELLER33333',
    sellerEmail: 'gaming@example.com',
    productName: 'Gaming Mousepad',
    productPrice: 899,
    productDescription:
      'Extended gaming mousepad with RGB edges and smooth surface.',
    productImages: [
      'https://example.com/images/mousepad1.jpg',
      'https://example.com/images/mousepad2.jpg',
    ],
  },
  {
    id: 10,
    productId: 10010,
    sellerId: 'SELLER44444',
    sellerEmail: 'accessories@example.com',
    productName: 'Laptop Stand',
    productPrice: 1499,
    productDescription:
      'Adjustable aluminum laptop stand with cooling ventilation.',
    productImages: [
      'https://example.com/images/stand1.jpg',
      'https://example.com/images/stand2.jpg',
    ],
  },
  {
    id: 11,
    productId: 10011,
    sellerId: 'SELLER55555',
    sellerEmail: 'compute@example.com',
    productName: 'External SSD',
    productPrice: 8999,
    productDescription:
      '1TB portable SSD with USB 3.2 and hardware encryption.',
    productImages: [
      'https://example.com/images/ssd1.jpg',
      'https://example.com/images/ssd2.jpg',
    ],
  },
    {
      id: 12,
      productId: 10012,
      sellerId: 'SELLER66666',
      sellerEmail: 'mobile@example.com',
      productName: 'Phone Gimbal',
      productPrice: 4999,
      productDescription:
        '3-axis smartphone gimbal with object tracking and time-lapse.',
      productImages: [
        'https://example.com/images/gimbal1.jpg',
        'https://example.com/images/gimbal2.jpg',
      ],
    },
    {
      id: 13,
      productId: 10013,
      sellerId: 'SELLER77777',
      sellerEmail: 'power@example.com',
      productName: 'Power Bank',
      productPrice: 2499,
      productDescription:
        '20000mAh power bank with PD fast charging and LCD display.',
      productImages: [
        'https://example.com/images/powerbank1.jpg',
        'https://example.com/images/powerbank2.jpg',
      ],
    },
    {
      id: 14,
      productId: 10014,
      sellerId: 'SELLER88888',
      sellerEmail: 'sound@example.com',
      productName: 'Portable Speaker',
      productPrice: 3999,
      productDescription:
        'Waterproof Bluetooth speaker with 24-hour battery life.',
      productImages: [
        'https://example.com/images/speaker1.jpg',
        'https://example.com/images/speaker2.jpg',
      ],
    },
    {
      id: 15,
      productId: 10015,
      sellerId: 'SELLER99999',
      sellerEmail: 'video@example.com',
      productName: 'Capture Card',
      productPrice: 6999,
      productDescription:
        '4K60 capture card with HDR pass-through and low latency.',
      productImages: [
        'https://example.com/images/capture1.jpg',
        'https://example.com/images/capture2.jpg',
      ],
    },
    {
      id: 16,
      productId: 10016,
      sellerId: 'SELLER10101',
      sellerEmail: 'stream@example.com',
      productName: 'Stream Deck',
      productPrice: 7499,
      productDescription:
        '15-key LCD stream deck for content creation and streaming.',
      productImages: [
        'https://example.com/images/streamdeck1.jpg',
        'https://example.com/images/streamdeck2.jpg',
      ],
    },
    {
      id: 17,
      productId: 10017,
      sellerId: 'SELLER20202',
      sellerEmail: 'network@example.com',
      productName: 'WiFi 6 Router',
      productPrice: 9999,
      productDescription:
        'Tri-band WiFi 6 router with mesh capability and parental controls.',
      productImages: [
        'https://example.com/images/router1.jpg',
        'https://example.com/images/router2.jpg',
      ],
    },
    {
      id: 18,
      productId: 10018,
      sellerId: 'SELLER30303',
      sellerEmail: 'comfort@example.com',
      productName: 'Ergonomic Wrist Rest',
      productPrice: 799,
      productDescription:
        'Memory foam keyboard wrist rest with cooling gel layer.',
      productImages: [
        'https://example.com/images/wristrest1.jpg',
        'https://example.com/images/wristrest2.jpg',
      ],
    },
    {
      id: 19,
      productId: 10019,
      sellerId: 'SELLER40404',
      sellerEmail: 'light@example.com',
      productName: 'Ring Light',
      productPrice: 2999,
      productDescription:
        '18-inch LED ring light with phone holder and remote control.',
      productImages: [
        'https://example.com/images/ringlight1.jpg',
        'https://example.com/images/ringlight2.jpg',
      ],
    },
    {
      id: 20,
      productId: 10020,
      sellerId: 'SELLER50505',
      sellerEmail: 'cable@example.com',
      productName: 'Cable Management Kit',
      productPrice: 999,
      productDescription:
        'Complete desk cable management solution with clips and sleeves.',
      productImages: [
        'https://example.com/images/cables1.jpg',
        'https://example.com/images/cables2.jpg',
      ],
    },
    {
      id: 21,
      productId: 10021,
      sellerId: 'SELLER60606',
      sellerEmail: 'desk@example.com',
      productName: 'Monitor Mount',
      productPrice: 3499,
      productDescription:
        'Dual monitor arm mount with gas spring and cable management.',
      productImages: [
        'https://example.com/images/mount1.jpg',
        'https://example.com/images/mount2.jpg',
      ],
    },
    {
      id: 22,
      productId: 10022,
      sellerId: 'SELLER70707',
      sellerEmail: 'cooling@example.com',
      productName: 'Laptop Cooling Pad',
      productPrice: 1799,
      productDescription:
        '5-fan laptop cooling pad with RGB lighting and height adjustment.',
      productImages: [
        'https://example.com/images/cooling1.jpg',
        'https://example.com/images/cooling2.jpg',
      ],
    },
    {
      id: 23,
      productId: 10023,
      sellerId: 'SELLER80808',
      sellerEmail: 'privacy@example.com',
      productName: 'Webcam Cover',
      productPrice: 299,
      productDescription:
        'Slim magnetic webcam cover compatible with laptops and tablets.',
      productImages: [
        'https://example.com/images/cover1.jpg',
        'https://example.com/images/cover2.jpg',
      ],
    },
    {
      id: 24,
      productId: 10024,
      sellerId: 'SELLER90909',
      sellerEmail: 'clean@example.com',
      productName: 'Screen Cleaning Kit',
      productPrice: 599,
      productDescription:
        'Professional screen cleaning kit with microfiber cloth and solution.',
      productImages: [
        'https://example.com/images/cleaning1.jpg',
        'https://example.com/images/cleaning2.jpg',
      ],
    },
    {
      id: 25,
      productId: 10025,
      sellerId: 'SELLER01010',
      sellerEmail: 'security@example.com',
      productName: 'Security Key',
      productPrice: 2499,
      productDescription:
        'FIDO2 security key with NFC and biometric authentication.',
      productImages: [
        'https://example.com/images/key1.jpg',
        'https://example.com/images/key2.jpg',
      ],
    },
    {
      id: 26,
      productId: 10026,
      sellerId: 'SELLER12121',
      sellerEmail: 'input@example.com',
      productName: 'Trackball Mouse',
      productPrice: 3999,
      productDescription:
        'Wireless ergonomic trackball mouse with precision sensor.',
      productImages: [
        'https://example.com/images/trackball1.jpg',
        'https://example.com/images/trackball2.jpg',
      ],
    },
    {
      id: 27,
      productId: 10027,
      sellerId: 'SELLER23232',
      sellerEmail: 'print@example.com',
      productName: 'Label Printer',
      productPrice: 4999,
      productDescription:
        'Wireless thermal label printer with smartphone connectivity.',
    productImages: [
      'https://example.com/images/printer1.jpg',
      'https://example.com/images/printer2.jpg',
    ],
  },
  {
    id: 28,
    productId: 10028,
    sellerId: 'SELLER34343',
    sellerEmail: 'remote@example.com',
    productName: 'Presentation Remote',
    productPrice: 1999,
    productDescription:
      'Wireless presenter with laser pointer and timer function.',
    productImages: [
      'https://example.com/images/remote1.jpg',
      'https://example.com/images/remote2.jpg',
    ],
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Button className="flex-1" variant="secondary">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductRow = ({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 300;
      const newPosition =
        direction === 'left'
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      rowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative group">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      <div
        ref={rowRef}
        className="flex overflow-x-auto gap-6 pb-6 px-2 scroll-smooth hide-scrollbar"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 border"
        disabled={scrollPosition <= 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

const ProductGrid = () => {
  // Split products into sections
  const newArrivals = products.slice(0, 10)
  const bestSellers = products.slice(10, 20)
  const specialOffers = products.slice(20)

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold mb-16 text-center">Discover Our Products</h2>
      <div className="space-y-20">
        {/* First row */}
        <ProductRow title="New Arrivals" products={newArrivals} />

        {/* Second row - only show if first row has products */}
        {newArrivals.length > 0 && bestSellers.length > 0 && (
          <ProductRow title="Best Sellers" products={bestSellers} />
        )}

        {/* Third row - only show if first and second rows have products */}
        {newArrivals.length > 0 && bestSellers.length > 0 && specialOffers.length > 0 && (
          <ProductRow title="Special Offers" products={specialOffers} />
        )}
      </div>
    </div>
  )
}

export default ProductGrid
