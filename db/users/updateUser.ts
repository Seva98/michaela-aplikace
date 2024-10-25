'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { User, userSchema } from './user';
import { revalidatePath } from 'next/cache';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const updateUser = async (state: unknown) => {
  const formData = state as FormData;

  const userData = {
    id: parseInt(formData.get('id')?.toString() || '0', 10),
    email: formData.get('email')?.toString(),
    first_name: formData.get('first_name')?.toString(),
    last_name: formData.get('last_name')?.toString(),
    address: formData.get('address')?.toString(),
    birthday: formData.get('birthday')?.toString(),
    phone: formData.get('phone')?.toString(),
    bio: formData.get('bio')?.toString(),
    color: formData.get('color')?.toString(),
  };

  const owner_id = await getOwnerId();

  const validatedData = userSchema.parse(userData);

  await sql`
      UPDATE michaela_users
      SET
        email = ${validatedData.email},
        first_name = ${validatedData.first_name},
        last_name = ${validatedData.last_name},
        address = ${validatedData.address},
        birthday = ${validatedData.birthday},
        phone = ${validatedData.phone},
        bio = ${validatedData.bio},
        color = ${validatedData.color}
      WHERE user_id = ${userData.id} AND owner_id = ${owner_id}
      RETURNING *;
    `;
};

export const changeUserOrder = async (formData: FormData) => {
  const { user_id, amount } = {
    user_id: parseInt(formData.get('user_id')?.toString() || '0', 10),
    amount: parseInt(formData.get('amount')?.toString() || '0', 10),
  };
  const owner_id = await getOwnerId();

  await sql`SELECT adjust_user_order(${user_id}, ${amount}, ${owner_id});`;
};

export const toggleUserVisibility = async (formData: FormData) => {
  const { user_id, is_hidden } = {
    user_id: parseInt(formData.get('user_id')?.toString() || '0', 10),
    is_hidden: formData.get('is_hidden') === 'true',
  };
  const owner_id = await getOwnerId();

  await sql`UPDATE michaela_users SET is_hidden = ${!is_hidden} WHERE user_id = ${user_id} AND owner_id = ${owner_id};`;
};
