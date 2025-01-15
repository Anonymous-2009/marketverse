// export const dynamic = 'force-static';
import { type NextRequest } from 'next/server';
import { db } from '@/db/index';
import { newsletterTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required.' },
        { status: 200 }
      );
    }

    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterTable)
      .where(eq(newsletterTable.email, email));

    if (existing.length > 0) {
      return NextResponse.json(
        { message: 'Email already subscribed.' },
        { status: 200 }
      );
    }

    // const user: typeof newsletterTable.$inferInsert = {
    //   email: email,
    // };
    //  const data = await db.insert(newsletterTable).values(user);

    // const data = await db.insert(newsletterTable).values({ email });
    await db.insert(newsletterTable).values({ email });
    return NextResponse.json(
      { message: 'Subscription successful!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  } finally {
    console.log('Finally the newsletter route is working');
  }
}
