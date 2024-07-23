'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { User, userSchema } from './user';
import { idSchema } from '../_tables/idSchema';

export const updateUser = async (state: unknown) => {
  const formData = state as FormData;

  try {
    const userData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
      email: formData.get('email')?.toString(),
      name: formData.get('name')?.toString(),
      address: formData.get('address')?.toString(),
      dateOfBirth: formData.get('dateOfBirth')?.toString(),
      phone: formData.get('phone')?.toString(),
    };

    const validatedData = userSchema.extend({ ...idSchema }).parse(userData);

    const result = await sql`
      UPDATE michaela_users
      SET
        email = COALESCE(${validatedData.email}, email),
        name = COALESCE(${validatedData.first_name}, name),
        address = COALESCE(${validatedData.address}, address),
        date_of_birth = COALESCE(${validatedData.birthday}, date_of_birth),
        phone = COALESCE(${validatedData.phone}, phone)
      WHERE id = ${validatedData.id}
      RETURNING *;
    `;
    return result.rows[0] as User;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data');
    }
    console.error(error);
    throw error;
  }
};
