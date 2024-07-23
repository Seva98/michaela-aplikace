'use server';

import { z } from 'zod';
import { zId } from '../_tables/idSchema';
import { sql } from '@vercel/postgres';

export const deleteBooking = async (formData: FormData) => {
  try {
    const deleteData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
    };

    const validatedData = zId.parse(deleteData);

    const result = await sql`
      DELETE FROM michaela_bookings
      WHERE id = ${validatedData.id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data');
    }
    console.error(error);
    throw error;
  }
};
