import cloudinary from '@/utils/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sellersInfoTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import sharp from 'sharp';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const email = formData.get('email');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Type guard for file
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Process image with Sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        mozjpeg: true,
      })
      .toBuffer();

    // Convert processed buffer to base64
    const base64String = processedImageBuffer.toString('base64');
    const uploadString = `data:image/jpeg;base64,${base64String}`;

    // Upload to Cloudinary with optimizations
    const result: CloudinaryUploadResponse = await cloudinary.uploader.upload(
      uploadString,
      {
        folder: 'profile_images',
        transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
      }
    );

    // Update seller profile with new image URL
    await db
      .update(sellersInfoTable)
      .set({ profileImageUrl: result.secure_url })
      .where(eq(sellersInfoTable.email, email))
      .returning();

    return NextResponse.json(
      {
        success: true,
        url: result.secure_url,
        message: 'File uploaded and compressed successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Upload failed',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
