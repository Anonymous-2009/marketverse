import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sellersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, email, firstName, lastName, username } = body;

    // Validate input
    if (
      !userId ||
      !email ||
      !email[0]?.emailAddress ||
      !firstName ||
      !lastName ||
      !username
    ) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailAddress = email[0].emailAddress;

    // Check if seller already exists
    const existingSeller = await db
      .select()
      .from(sellersTable)
      .where(eq(sellersTable.email, emailAddress))
      .limit(1);

    if (existingSeller.length > 0) {
      return NextResponse.json(
        { message: 'Seller with this email already exists.' },
        { status: 400 }
      );
    }

    // Insert data into sellers table
    const newSeller = await db.insert(sellersTable).values({
      email: emailAddress,
      uniqueId: userId,
      username,
      firstName,
      lastName,
    });

    return NextResponse.json(
      { message: 'Seller added successfully.', seller: newSeller },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding seller:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
