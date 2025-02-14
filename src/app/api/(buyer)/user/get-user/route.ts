import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { eq } from 'drizzle-orm';
import { buyerProfile } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'email is required.' },
        { status: 400 }
      );
    }

    console.log(email);
    const buyer = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, email))
      .limit(1);
    // console.log(seller);
    if (buyer.length === 0) {
      return NextResponse.json(
        { message: 'buyer not found.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'success', data: buyer },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
