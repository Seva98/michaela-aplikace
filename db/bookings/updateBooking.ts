'use server';

import { sql } from '@vercel/postgres';
import { bookingSchema } from './booking';
import { z } from 'zod';
import { idSchema } from '../_tables/idSchema';

export const updateBooking = async (formData: FormData) => {
  try {
    const bookingData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
      date: formData.get('date')?.toString(),
      userId: formData.get('userId') ? parseInt(formData.get('userId')?.toString() || '0', 10) : undefined,
      configurationId: formData.get('configurationId') ? parseInt(formData.get('configurationId')?.toString() || '0', 10) : undefined,
    };

    const validatedData = bookingSchema.extend({ ...idSchema }).parse(bookingData);

    const result = await sql`
      UPDATE michaela_bookings
      SET
        date = COALESCE(${validatedData.date}, date),
        user_id = COALESCE(${validatedData.userId}, user_id),
        configuration_id = COALESCE(${validatedData.configurationId}, configuration_id)
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
