'use server';
import { put, del } from '@vercel/blob';
import { randomUUID } from 'crypto';

export async function uploadImageAction(formData: FormData) {
  const imageFile = formData.get('image') as File;
  if (!imageFile.size) return;

  const oldImage = formData.get('old_image') as string;
  const folder = formData.get('folder') as string;
  const newFileName = `${randomUUID()}.${imageFile.name.split('.').pop()}`;

  // Validate file type
  if (!imageFile.type.startsWith('image/')) {
    throw new Error('Only image files are allowed.');
  }

  // Validate file size
  const fileSizeInMB = imageFile.size / (1024 * 1024);
  if (fileSizeInMB > 10) {
    throw new Error('File size exceeds the 10MB limit.');
  }

  // Upload compressed or original image to blob storage
  const blob = await put(`${folder}${newFileName}`, imageFile, {
    access: 'public',
  });

  // Delete the old image if it exists
  if (oldImage) {
    try {
      await del(oldImage);
    } catch (error) {
      console.log(`No old image to delete: ${oldImage}`);
    }
  }

  return blob;
}
