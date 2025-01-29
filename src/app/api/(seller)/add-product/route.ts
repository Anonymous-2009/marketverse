import cloudinary from '@/utils/cloudinary';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { products } from '@/db/schema';
import sharp from 'sharp';

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

    // Validate other fields (keeping your existing validation)
    const rawPrice = body.get('productPrice');
    const productPrice = Number(rawPrice);

    if (isNaN(productPrice) || productPrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid product price. Price must be a positive number.' },
        { status: 400 }
      );
    }

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

    function generateFiveDigitCode() {
      return Math.floor(10000 + Math.random() * 90000);
    }
    const productId = generateFiveDigitCode();

    // Modified image upload process with compression
    const uploadPromises = productImages.map(async (image: any) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Compress the image using Sharp
      const compressedImageBuffer = await sharp(buffer)
        .resize(1080, 1080, { // Resize to maximum dimensions while maintaining aspect ratio
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ // Convert to JPEG and compress
          quality: 80, // Adjust quality (0-100)
          mozjpeg: true // Use mozjpeg compression
        })
        .toBuffer();

      // Convert compressed buffer to base64
      const base64String = compressedImageBuffer.toString('base64');
      const uploadString = `data:image/jpeg;base64,${base64String}`;

      // Upload to Cloudinary with additional optimization options
      const result = await cloudinary.uploader.upload(uploadString, {
        folder: 'products',
        transformation: [
          { quality: 'auto:good' }, // Let Cloudinary optimize quality
          { fetch_format: 'auto' }, // Automatically choose best format
          { strip: true } // Strip unnecessary metadata
        ],
        resource_type: 'image'
      });

      return result.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Prepare and insert product data (keeping your existing code)
    const info: typeof products.$inferInsert = {
      productName: body.get('productName') as string,
      productId,
      sellerId: body.get('sellerID') as string,
      sellerEmail: body.get('sellerEmail') as string,
      productPrice: Math.floor(productPrice),
      productDescription: body.get('productDescription') as string,
      productImages: uploadedImages,
    };

    const result = await db.insert(products).values(info);
    
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