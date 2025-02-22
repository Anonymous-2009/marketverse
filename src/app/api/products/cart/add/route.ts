import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Import your Drizzle DB instance
import { buyerProfile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(req: NextRequest) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json(
        { error: 'Email and productId are required' },
        { status: 400 }
      );
    }

    // Fetch buyer's cart
    const buyer = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, email))
      .limit(1);

    if (!buyer.length) {
      return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });
    }

    let cartItems: number[] = Array.isArray(buyer[0].cartItems)
      ? buyer[0].cartItems
      : [];

    // Check if product already exists in the cart
    if (cartItems.includes(productId)) {
      return NextResponse.json({
        message: 'Product already in cart',
        cartItems,
      });
    }

    // Add productId to cart
    cartItems.push(productId);

    // Update the buyer's cart in the database
    await db
      .update(buyerProfile)
      .set({ cartItems })
      .where(eq(buyerProfile.email, email));

    return NextResponse.json({ message: 'Product added to cart', cartItems });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
