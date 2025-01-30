import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust the import path if needed
import { products } from '@/db/schema'; // Adjust the schema path if needed
import { eq } from 'drizzle-orm';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(
  req: NextRequest,
  context: Context
): Promise<NextResponse> {
  const { params } = await context;
  const { id } = await params;
  const productId = Number(id);
  console.log('productId', productId);

  try {
    if (isNaN(productId)) {
      return NextResponse.json(
        { message: 'Invalid product ID' },
        { status: 400 }
      );
    }
    const deletedProduct = await db
      .delete(products)
      .where(eq(products.productId, productId));
    console.log(deletedProduct);
    if (!deletedProduct.rowCount) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
