import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { paymentAccount } from '@/db/schema'; // Adjust the schema path if needed
import { eq } from 'drizzle-orm';

interface Context {
  params: {
    username: string;
  };
}

export async function DELETE(
  req: NextRequest,
  context: Context
): Promise<NextResponse> {
  const { params } = await context;
  const { username } = await params;

  try {
    await db
      .delete(paymentAccount)
      .where(eq(paymentAccount.accountUsername, username));
    return NextResponse.json(
      { message: 'payment account unlink' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: 'getting some kind of error' },
    { status: 200 }
  );
}
