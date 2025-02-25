import { db } from '@/db';
import {
  buyerAddress,
  buyerPayment,
  buyerProfile,
  orders,
  paymentAccount,
  products,
  sellersInfoTable,
} from '@/db/schema';
import transporter from '@/utils/nodemailer';
import axios from 'axios';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const data = await req.json();
  if (!data) {
    return NextResponse.json(
      {
        message: 'Invalid data',
      },
      { status: 200 }
    );
  }

  console.log('data', data);
  const {
    buyerEmail,
    sellerEmail,
    productId,
    addressID,
    accountNumber,
    accountUsername,
    password,
    productPrice,
  } = data;

  try {
    // check if buyer, and seller email exists with product id
    // Fetch buyer's
    const buyer = (await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, buyerEmail))
      .limit(1)) as unknown as {
      wishlistItems: { id: number }[];
      cartItems: { id: number }[];
    }[];

    if (!buyer.length) {
      return NextResponse.json({ error: 'Buyer not found' }, { status: 200 });
    }
    console.log(buyer);

    // Fetch seller
    const seller = await db
      .select()
      .from(sellersInfoTable)
      .where(eq(sellersInfoTable.email, sellerEmail))
      .limit(1);

    if (!seller.length) {
      return NextResponse.json({ error: 'seller not found' }, { status: 200 });
    }

    console.log('seller', seller);
    // check if seller has payment account
    const sellerPayment = await db
      .select()
      .from(paymentAccount)
      .where(eq(paymentAccount.sellerEmail, sellerEmail))

      .limit(1);

    if (!sellerPayment.length) {
      return NextResponse.json(
        { error: 'seller payment account not found' },
        { status: 200 }
      );
    }

    // Fetch address
    const address = await db
      .select()
      .from(buyerAddress)
      .where(eq(buyerAddress.addressID, addressID))
      .limit(1);

    if (!address.length) {
      return NextResponse.json({ error: 'address not found' }, { status: 200 });
    }

    // Fetch products
    const product = await db
      .select()
      .from(products)
      .where(eq(products.productId, productId))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: 'products not found' },
        { status: 200 }
      );
    }

    // Fetch payment
    const payment = await db
      .select()
      .from(buyerPayment)
      .where(
        and(
          eq(buyerPayment.accountNumber, accountNumber),
          eq(buyerPayment.accountUsername, accountUsername)
        )
      )
      .limit(1);

    if (!payment.length) {
      return NextResponse.json({ error: 'payment not found' }, { status: 200 });
    }

    // here we will simulate a payment gateway transfer
    const orderData = {
      senderAccNo: accountNumber,
      senderAccPassword: password,
      receiverAccNo: sellerPayment[0].accountNumber,
      amount: productPrice,
    };

    const orderCall = await axios.post(
      'https://marketverse-banking.onrender.com/transaction/transfer',
      orderData
    );

    if (orderCall.data.message !== 'Transaction successful') {
      return NextResponse.json(
        { message: 'payment failed due to ' + orderCall.data.message + '' },
        { status: 200 }
      );
    }

    // // add order to order table
    const info: typeof orders.$inferInsert = {
      orderId: Math.floor(10000 + Math.random() * 90000),
      buyerEmail,
      sellerEmail,
      status: 'pending',
      productId,
      addressID,
      accountNumber,
      accountUsername,
      transactionN0: orderCall.data.transaction.transactionNo,
    };

    const result = await db.insert(orders).values(info);

    if (!result.rowCount || result.rowCount === 0) {
      return NextResponse.json(
        { message: 'order not placed' },
        { status: 200 }
      );
    }

    const updatedCart = buyer[0].cartItems.filter((item) => item !== productId);
    const updateWishlist = buyer[0].wishlistItems.filter(
      (item) => item !== productId
    );
    await db
      .update(buyerProfile)
      .set({ cartItems: updatedCart })
      .where(eq(buyerProfile.email, buyerEmail));
    await db
      .update(buyerProfile)
      .set({ wishlistItems: updateWishlist })
      .where(eq(buyerProfile.email, buyerEmail));

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: buyerEmail,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Dear Customer,</p>
        <p>Thank you for your order. Your order ID is <strong>${info.orderId}</strong>.</p>
        <p>Product: ${product[0].productName}</p>
        <p>Price: ₹${productPrice}</p>
        <p>Status: <strong>Pending</strong></p>
        <p>We will update you once the seller confirms the order.</p>
        <p>Best regards,<br>MarketVerse Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        message: 'Order placed successfully!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'some error occur in server' },
      { status: 500 }
    );
  }
}
