'use server';
import { sql } from '@vercel/postgres';

import { userSchema } from './user';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const createUser = async (state: unknown) => {
  const formData = state as FormData;

  const userData = {
    email: formData.get('email')?.toString(),
    first_name: formData.get('first_name')?.toString(),
    last_name: formData.get('last_name')?.toString(),
    address: formData.get('address')?.toString(),
    birthday: formData.get('birthday')?.toString(),
    phone: formData.get('phone')?.toString(),
    bio: formData.get('bio')?.toString(),
    color: formData.get('color')?.toString(),
  };
  const { email, first_name, last_name, address, birthday, phone, bio, color } = userSchema.parse(userData);
  const owner_id = await getOwnerId();

  await sql`
      INSERT INTO michaela_users (email, first_name, last_name, address, birthday, phone, bio, color, "order", owner_id)
      VALUES (${email}, 
        ${first_name}, 
        ${last_name}, 
        ${address}, 
        ${birthday}, 
        ${phone}, 
        ${bio}, 
        ${color},
        COALESCE((SELECT MAX("order") FROM michaela_users), 0) + 1),
        ${owner_id}
      RETURNING *;
    `;
};
