import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust the import path if needed
import { paymentAccount } from '@/db/schema'; // Adjust the schema path if needed
import { eq } from 'drizzle-orm';


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
): Promise<NextResponse> {
 
  const email = (await params).email

  if (!email)
    return NextResponse.json({ message: 'email is requreid' }, { status: 200 });
  console.log('productId :', email);
  try {
    const result = await db
      .select()
      .from(paymentAccount)
      .where(eq(paymentAccount.sellerEmail, email));
    console.log(result);

    if (result.length === 0)
      return NextResponse.json(
        { message: 'no payment account found', result },
        { status: 200 }
      );
    return NextResponse.json(
      { message: 'payment account found', result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json(
    { message: 'some internal error found' },
    { status: 200 }
  );
}
