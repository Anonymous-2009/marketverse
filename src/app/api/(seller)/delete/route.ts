import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sellersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log('email:', email);
    console.log('body:', body.primaryEmailAddress.emailAddress);
    // Validate input
    if (!body.primaryEmailAddress.emailAddress) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // Check if the seller exists
    const existingSeller = await db
      .select()
      .from(sellersTable)
      .where(eq(sellersTable.email, body.primaryEmailAddress.emailAddress))
      .limit(1);

    if (existingSeller.length === 0) {
      return NextResponse.json({ message: 'Seller not found.' }, { status: 404 });
    }

    // Delete the seller
    await db.delete(sellersTable).where(eq(sellersTable.email, body.primaryEmailAddress.emailAddress));

    return NextResponse.json(
      { message: `Seller with email '${body.primaryEmailAddress.emailAddress}' has been deleted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting seller:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}