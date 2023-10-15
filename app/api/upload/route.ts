import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isBase64Image(data: string) {
  if (typeof data !== 'string' || !data.startsWith('data:image')) return false;
  const [, base64Data] = data.split(',');
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(base64Data) && (base64Data.length % 4 === 0); // Check if length is multiple of 4
}

const cloudinaryConfig = {
  folder: 'store',
};

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  if (req.method === 'POST') {
    const { image } = await req.json();
    // TODO: accept different file types (pdf, video, etc...)
    const isValidImage = isBase64Image(image);
    if (!isValidImage) return NextResponse.json({ message: 'Image should be base64 encoded' }, { status: 400 });
    const uploadResponse = await cloudinary.uploader.upload(image, cloudinaryConfig);
    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  }
  return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
