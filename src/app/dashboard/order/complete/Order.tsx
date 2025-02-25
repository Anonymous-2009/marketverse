'use client';

import { useEffect, useState } from 'react';
import { PackageSearch } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Address {
  fullName: string;
  streetName: string;
  city: string;
  state: string;
  pincode: string;
  phoneNo: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
}

interface PaymentAccount {
  accountUsername: string;
  accountNumber: string;
}

interface Order {
  orderID: number;
  orderStatus: 'pending' | 'approved' | 'cancelled' | 'delivered';
  orderDate: string; // Added order date
  sellerEmail: string;
  buyerEmail: string;
  address: Address;
  products: Product;
  paymentAccount: PaymentAccount;
}

export default function OrdersPage({ email }: { email: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `/api/order/get-delivered-orders/${email}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch account data.',
        });
      }
    };

    getData();
  }, []);

  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (orders.length === 0) {
    return (
      <Card className="bg-card">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <PackageSearch className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-muted-foreground text-center max-w-md">
            It looks like you haven't placed any orders yet. Start shopping to
            see your orders here!
          </p>
          <Button className="mt-6" onClick={() => (window.location.href = '/')}>
            Start Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-primary">Your Orders</h1>
        {orders.map((order) => (
          <Card key={order.orderID} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Order #{order.orderID}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ordered on {formatDate(order.orderDate)}
                </p>
              </div>
              <Badge
                variant={
                  order.orderStatus === 'pending' ? 'default' : 'secondary'
                }
              >
                {order.orderStatus}
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <p className="text-lg font-medium">{order.products.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.products.description}
                  </p>
                  <p className="text-lg font-bold mt-2">
                    ₹{order.products.price}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.streetName}</p>
                  <p>
                    {order.address.city}, {order.address.state}{' '}
                    {order.address.pincode}
                  </p>
                  <p>Phone: {order.address.phoneNo}</p>
                </div>
              </div>
              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Seller Information</h3>
                  <p className="text-sm">Email: {order.sellerEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <p className="text-sm">
                    Account Username: {order.paymentAccount.accountUsername}
                  </p>
                  <p className="text-sm">
                    Account Number: {order.paymentAccount.accountNumber}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MarketVerse. All rights
                  reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
