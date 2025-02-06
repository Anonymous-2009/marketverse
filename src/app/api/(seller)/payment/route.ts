import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { paymentAccount } from '@/db/schema';
import axios from 'axios';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { username, password, sellerId, sellerEmail } = body;

  if (!username || !password)
    return NextResponse.json({ message: 'all field are needed' });
  if (!sellerEmail || !sellerId)
    return NextResponse.json({ message: 'all field are needed' });

  try {
    const data = await axios.post('http://localhost:4000/auth/login', body);
    const finalData = await data.data;
    console.log(data.data);
    console.log(data.data.user.accountNumber);

    const insertData: typeof paymentAccount.$inferInsert = {
      accountUsername: finalData.user.username,
      accountNumber: finalData.user.accountNumber,
      sellerId,
      sellerEmail,
    };

    const value = await db.insert(paymentAccount).values(insertData);
    console.log(value)
    return NextResponse.json({ message: 'payment account link successfully', value });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'working' });
}

// from unlink the payment account
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ message: 'working83728482' });
}
