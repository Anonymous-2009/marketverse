import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sellersInfoTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

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
    const seller = await db
      .select()
      .from(sellersInfoTable)
      .where(eq(sellersInfoTable.email, email))
      .limit(1);
    // console.log(seller);
    if (seller.length === 0) {
      return NextResponse.json(
        { message: 'Seller not found.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'success', data: seller },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
