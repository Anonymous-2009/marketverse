import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { buyerAddress, buyerPayment, orders, products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
): Promise<NextResponse> {
  const buyerEmail = (await params).email;
  try {
    if (!buyerEmail) {
      return NextResponse.json(
        { message: 'Buyer email is required.' },
        { status: 200 }
      );
    }

    // Fetch orders for the buyer
    const buyerOrders = await db
      .select({
        orderID: orders.orderId,
        orderStatus: orders.status,
        orderDate: orders.orderAt,
        sellerEmail: orders.sellerEmail,
        buyerEmail: orders.buyerEmail,
        address: {
          fullName: buyerAddress.fullName,
          streetName: buyerAddress.streetName,
          city: buyerAddress.city,
          state: buyerAddress.state,
          pincode: buyerAddress.pincode,
          phoneNo: buyerAddress.phoneNo,
        },
        products: {
          name: products.productName,
          price: products.productPrice,
          description: products.productDescription,
        },
        paymentAccount: {
          accountUsername: buyerPayment.accountUsername,
          accountNumber: buyerPayment.accountNumber,
        },
      })
      .from(orders)
      .where(eq(orders.buyerEmail, buyerEmail))
      .leftJoin(products, eq(orders.productId, products.productId))
      .leftJoin(buyerAddress, eq(orders.addressID, buyerAddress.addressID))
      .leftJoin(
        buyerPayment,
        eq(orders.accountNumber, buyerPayment.accountNumber)
      );

    if (!buyerOrders.length) {
      return NextResponse.json(
        { message: 'No orders found for this buyer.', data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'orders are successfully fetch', data: buyerOrders },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'some error occur in server' },
      { status: 500 }
    );
  }
}
