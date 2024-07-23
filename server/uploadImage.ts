'use server';
import { put, del } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function uploadImage(formData: FormData) {
  try {
    const imageFile = formData.get('image') as File;
    const oldImage = formData.get('old_image') as string;
    const user_id = parseInt(formData.get('user_id') as string);

    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });

    await del(oldImage);

    await sql`
      UPDATE michaela_users
      SET image = ${blob.url}
      WHERE user_id = ${user_id};
    `;

    revalidatePath('/');
    return blob;
  } catch (error) {
    console.error(error);
  }
}
