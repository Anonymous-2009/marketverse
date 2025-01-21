import cloudinary from '@/utils/cloudinary';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { products } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    // Get all product images from the request
    const productImages = body.getAll('productImages');
    if (!productImages?.length) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Get and validate the price first
    const rawPrice = body.get('productPrice');
    const productPrice = Number(rawPrice);

    // Validate price - uncomment and modify these checks as needed
    if (isNaN(productPrice) || productPrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid product price. Price must be a positive number.' },
        { status: 400 }
      );
    }

    // Check for required fields
    if (
      !body.get('productName') ||
      !rawPrice ||
      !body.get('productDescription') ||
      !body.get('sellerID')
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    console.log('seller if', body.get('sellerID'));

    // Function to generate a 5-digit product ID
    function generateFiveDigitCode() {
      return Math.floor(10000 + Math.random() * 90000);
    }
    const productId = generateFiveDigitCode(); // Note: removed toString()

    // Upload all images to Cloudinary
    const uploadPromises = productImages.map(async (image: any) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Convert the buffer to a Base64 string
      const base64String = buffer.toString('base64');
      const uploadString = `data:${image.type};base64,${base64String}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(uploadString, {
        folder: 'products',
      });

      return result.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Prepare the product data
    const info: typeof products.$inferInsert = {
      productName: body.get('productName') as string,
      productId, // Now it's a number, matching the schema
      sellerId: body.get('sellerID') as string, // Already validated as a number
      sellerEmail: body.get('sellerEmail') as string,
      productPrice: Math.floor(productPrice), // Ensure it's an integer
      productDescription: body.get('productDescription') as string,
      productImages: uploadedImages,
    };

    // Insert the product into the database
    const result = await db.insert(products).values(info);
    // console.log('Product uploaded:', result);
    return NextResponse.json(
      { message: 'Product successfully listed in MarketVerse' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading product:', error);
    return NextResponse.json(
      { error: 'Failed to upload product' },
      { status: 500 }
    );
  }
}
