import cloudinary from '@/utils/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sellersInfoTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any; // Add more properties if needed
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const email = formData.get('email');

    console.log(email);

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

    console.log(file);
    // Convert file buffer to base64
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    const base64String = buffer.toString('base64');
    const uploadString = `data:${file.type};base64,${base64String}`;
    // console.log(uploadString, fileBuffer, buffer)
    // Upload to Cloudinary
    const result: CloudinaryUploadResponse = await cloudinary.uploader.upload(
      uploadString,
      {
        folder: 'profile_images',
      }
    );
    console.log(result.secure_url);

    await db
      .update(sellersInfoTable)
      .set({ profileImageUrl: result.secure_url })
      .where(eq(sellersInfoTable.email, email))
      .returning();

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      message: 'file upload successfully',
    }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
