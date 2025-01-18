import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sellersInfoTable } from '@/db/schema';
import { eq } from 'drizzle-orm';


export async function PUT(req: NextRequest) {
    const data = await req.json()
    console.log(data)
    try {
     const result = await db
        .update(sellersInfoTable)
        .set({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          phoneNo: data.phoneNo,
          gender: data.gender,
          updatedAt: new Date().toISOString(),  // Update the timestamp
        })
        .where(eq(sellersInfoTable.email, data.email)).returning(); // Filter by email
        console.log(result)
       return NextResponse.json({message: 'user updated successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 });
      }
}
