'use server';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteUser = async (formData: FormData) => {
  try {
    const id = parseInt(formData.get('user_id')?.toString() || '0', 10);
    const owner_id = await getOwnerId();

    await sql`
      DELETE FROM michaela_users
      WHERE user_id = ${id} AND owner_id = ${owner_id}
    `;

    await sql`
    SELECT resequence_orders('michaela_users', 'order', 'user_id', ${owner_id});
    `;

    revalidatePath('/');
    revalidatePath('/users', 'page');
    revalidatePath('/users/[slug]', 'page');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
