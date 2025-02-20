import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    no: string;
  };
}

export async function GET(
  req: NextRequest,
  context: Context
): Promise<NextResponse> {
  try {
    const { no } = await context.params;
    const num = parseInt(no, 10);

    if (isNaN(num)) {
      return NextResponse.json(
        { message: 'Invalid product ID. It must be a number.' },
        { status: 400 }
      );
    }

    const pro = await db
      .select()
      .from(products)
      .where(eq(products.productId, num))
      .limit(1);

    if (pro.length === 0) {
      return NextResponse.json(
        { message: `Product with ID ${num} not found.` },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Success', data: pro[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Internal Server Error', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Unknown Server Error' },
      { status: 500 }
    );
  }
}
