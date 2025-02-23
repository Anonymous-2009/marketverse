import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { desc, eq } from 'drizzle-orm';
import { buyerAddress } from '@/db/schema';


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
): Promise<NextResponse> {

  const email = (await params).email
  try {
    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'email is required.' },
        { status: 400 }
      );
    }

    console.log(email);
    const address = await db
      .select()
      .from(buyerAddress)
      .where(eq(buyerAddress.email, email))
      .orderBy(desc(buyerAddress.isDefault));
    // console.log(seller);
    if (address.length === 0) {
      return NextResponse.json(
        { message: 'buyer Address not found.', address },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'success', address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'error find buyer address' },
      { status: 500 }
    );
  }
}
