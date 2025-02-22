import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Import your Drizzle DB instance
import { buyerProfile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: NextRequest) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json(
        { error: 'Email and productId are required' },
        { status: 200 }
      );
    }

    // Fetch buyer's wishlist
    const buyer = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, email))
      .limit(1);

    if (!buyer.length) {
      return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });
    }

    let cartItems: number[] = (buyer[0].wishlistItems as number[]) || [];

    // Check if product exists in the wishlist
    if (!cartItems.includes(productId)) {
      return NextResponse.json(
        { message: 'Product not found in wishlist' },
        { status: 200 }
      );
    }

    // Remove productId from wishlist
    cartItems = cartItems.filter((id) => id !== productId);

    // Update the buyer's wishlist in the database
    await db
      .update(buyerProfile)
      .set({ wishlistItems: cartItems })
      .where(eq(buyerProfile.email, email));

    return NextResponse.json({
      message: 'Product removed from wishlist',
      cartItems,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
