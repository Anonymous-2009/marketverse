import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { buyerAddress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { ApiResponseCommon } from '@/types';

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponseCommon>> {
  try {
    const data = await req.json();

    const {
      email,
      addressID,
      isDefault,
    }: { email: string; addressID: number; isDefault: boolean } = data;
    if (!email || !addressID) {
      return NextResponse.json(
        { message: 'Email and address ID are required' },
        { status: 400 }
      );
    }

    if (isDefault) {
      // Start a transaction to ensure consistency
      await db.transaction(async (trx) => {
        // Step 1: Set all addresses of the user to `is_default: false`
        await trx
          .update(buyerAddress)
          .set({ isDefault: false })
          .where(eq(buyerAddress.email, email));

        // Step 2: Set the selected address to `is_default: true`
        await trx
          .update(buyerAddress)
          .set({ isDefault: true })
          .where(
            and(
              eq(buyerAddress.email, email),
              eq(buyerAddress.addressID, addressID)
            )
          );
      });
    }

    return NextResponse.json(
      { message: 'Default Address updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
