import { db } from '@/db';
import { buyerProfile, reviews } from '@/db/schema';
import { reviewSchema } from '@/validation';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const data = await req.json().catch(() => null);

  if (!data) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }

  // Validate input data
  const validationResult = reviewSchema.safeParse(data);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: 'Validation failed',
        errors: validationResult.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  try {
    const { email } = data;
    const buyerInfo = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, email))
      .limit(1);
    if (!buyerInfo) {
      return NextResponse.json(
        { message: 'Buyer not found, cannot add review' },
        { status: 404 }
      );
    }

    console.log(data, buyerInfo);

    const info: typeof reviews.$inferInsert = {
      ...data,
      firstName: buyerInfo[0].firstName,
      lastName: buyerInfo[0].lastName,
      profileImageUrl: buyerInfo[0].profileImageUrl,
    };

    const result = await db.insert(reviews).values(info);

    if (!result) {
      return NextResponse.json(
        { message: 'Review insertion failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Thank you for your review!' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Unknown Server Error' },
      { status: 500 }
    );
  }
}
