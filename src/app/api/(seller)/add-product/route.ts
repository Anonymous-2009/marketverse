
import cloudinary from '@/utils/cloudinary';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { products } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    console.log(body.get('sellerEmail'))
    // const file = body.get('productImages');
    const productImages = body.getAll('productImages')
    console.log('image', productImages)

    if (!productImages?.length) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      )
    }

    if (!body.get('productName')) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      )
    }

    
    const uploadPromises = productImages.map(async (image: any) => {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Convert the buffer to a Base64 string
      const base64String = buffer.toString('base64')
      const uploadString = `data:${image.type};base64,${base64String}`

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(uploadString, {
        folder: 'products', // Optional: organize uploads in folders
      })

      return {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height
      }
    })
    function generateFiveDigitCode() {
      return Math.floor(10000 + Math.random() * 90000);
  }
  
  const code = generateFiveDigitCode();
  console.log("Generated Code:", code);

    const uploadedImages = await Promise.all(uploadPromises)
    console.log(uploadedImages[0].url, uploadedImages[1].url)

      const info: typeof products.$inferInsert = {
      productName: body.get('productName') as string || '',
      productId: code.toString(),
      sellerId: body.get('sellerID') ? Number(body.get('sellerID')) : undefined,
      productPrice: (body.get('productPrice') as string) || '',
      productDescription: (body.get('productDescription') as string) || '',
      productImages: [uploadedImages[0].url, uploadedImages[1].url]
    }



     await db.insert(products).values(info);

    return NextResponse.json({ message:'' }, { status: 201 } )
  } catch (error) {
    console.log(error)
  }
}
