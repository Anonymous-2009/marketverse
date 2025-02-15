import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { buyerAddress, buyerProfile } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { addressSchema } from '@/validation';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json().catch(() => null);

    if (!data) {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate input data
    const validationResult = addressSchema.safeParse(data);

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

    // Check if buyer exists
    const existingBuyer = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, data.email))
      .limit(1);

    if (!existingBuyer.length) {
      return NextResponse.json({ message: 'Buyer not found' }, { status: 404 });
    }

    const randomID = Math.floor(100000 + Math.random() * 900000);

    console.log(data);
    // Prepare and insert the new address
    const info: typeof buyerAddress.$inferInsert = {
      ...data,
      addressID: randomID,
    };

    const result = await db.insert(buyerAddress).values(info);

    if (!result) {
      return NextResponse.json(
        { message: 'Address insertion failed' },
        { status: 500 }
      );
    }

    if (result && data.isDefault) {
      // Start a transaction to ensure consistency
      await db.transaction(async (trx) => {
        // Step 1: Set all addresses of the user to `is_default: false`
        await trx
          .update(buyerAddress)
          .set({ isDefault: false })
          .where(eq(buyerAddress.email, data.email));

        // Step 2: Set the selected address to `is_default: true`
        await trx
          .update(buyerAddress)
          .set({ isDefault: true })
          .where(
            and(
              eq(buyerAddress.email, data.email),
              eq(buyerAddress.addressID, randomID)
            )
          );
      });
    }

    return NextResponse.json(
      {
        message: 'Address added successfully',
        data: result,
      },
      { status: 201 } // 201 Created for successful resource creation
    );
  } catch (error) {
    console.error('Error adding address:', error);

    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { message: 'This address already exists' },
          { status: 409 }
        );
      }

      if (error.message.includes('foreign key constraint')) {
        return NextResponse.json(
          { message: 'Invalid reference in the data' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// for update user we create a put request
export async function PUT(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json().catch(() => null);

    if (!data) {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate input data
    const validationResult = addressSchema.safeParse(data);

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

    // Check if buyer exists
    const existingBuyer = await db
      .select()
      .from(buyerProfile)
      .where(eq(buyerProfile.email, data.email))
      .limit(1);

    if (!existingBuyer.length) {
      return NextResponse.json({ message: 'Buyer not found' }, { status: 404 });
    }

    const result = await db
      .update(buyerAddress)
      .set({
        country: data.country,
        fullName: data.fullName,
        streetName: data.streetName,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        phoneNo: data.phoneNo,
        isDefault: data.isDefault,

        updatedAt: new Date().toISOString(),
      })
      .where(eq(buyerAddress.addressID, data.addressID))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { message: 'Address Updation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Address Update successfully',
        data: result,
      },
      { status: 201 } // 201 Created for successful resource creation
    );
  } catch (error) {
    console.error('Error adding address:', error);

    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { message: 'This address already exists' },
          { status: 409 }
        );
      }

      if (error.message.includes('foreign key constraint')) {
        return NextResponse.json(
          { message: 'Invalid reference in the data' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// for delete user address we create a delete request
export async function DELETE(req: NextRequest) {
  const data = await req.json().catch(() => null);

  if (!data) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { id } = data;
  console.log(id);

  try {
    const result = await db
      .delete(buyerAddress)
      .where(eq(buyerAddress.addressID, id))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { message: 'Address deletion failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Address deleted successfully',
        data: result,
      },
      { status: 201 } // 201 Created for successful resource creation
    );
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
