import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { buyerPayment } from '@/db/schema';
import axios from 'axios';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { username, password, buyerId, buyerEmail } = body;

  if (!username || !password)
    return NextResponse.json({ message: 'all field are needed' });
  if (!buyerEmail || !buyerId)
    return NextResponse.json({ message: 'all field are needed' });

  try {
    const data = await axios.post(
      'https://marketverse-banking.onrender.com/auth/login',
      body
    );

    const finalData = await data.data;

    if (!data.data.success) {
      return NextResponse.json({
        message: 'plz given correct username and password',
      });
    }
    console.log(data.data);
    console.log(data.data.user.accountNumber);

    const insertData: typeof buyerPayment.$inferInsert = {
      accountUsername: finalData.user.username,
      accountNumber: finalData.user.accountNumber,
      buyerId,
      buyerEmail,
    };

    const value = await db.insert(buyerPayment).values(insertData);
    console.log(value);
    return NextResponse.json({
      message: 'payment account link successfully',
      value,
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'working' });
}

// from unlink the payment account
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ message: 'working83728482' });
}
