'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { bookingSchema } from './booking';

export const createBooking = async (formData: FormData, userId?: number, configurationId?: number) => {
  try {
    const bookingData = {
      date: formData.get('date')?.toString(),
      userId: parseInt(formData.get('userId')?.toString() || '0', 10),
      configurationId: parseInt(formData.get('configurationId')?.toString() || '0', 10),
    };

    const validatedData = bookingSchema.parse(bookingData);

    const result = await sql`
      INSERT INTO michaela_bookings (date, user_id, configuration_id)
      VALUES (${validatedData.date}, ${validatedData.userId}, ${validatedData.configurationId})
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
