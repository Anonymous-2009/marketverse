import { db } from '@/db';
import { products } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest
): Promise<NextResponse> {
  try {
    const product = await db.select().from(products);
    
    if (!product) {
      return NextResponse.json({
        message: 'sorry, no product found in database',
      });
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'some error occur in server' },
      { status: 500 }
    );
  }
}