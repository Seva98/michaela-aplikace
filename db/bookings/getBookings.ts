import 'server-only';
import { zId } from '../_tables/idSchema';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { Booking } from './booking';
export const getBookingById = async (formData: FormData) => {
  try {
    const getData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
    };

    const validatedData = zId.parse(getData);

    const result = await sql`
      SELECT * FROM michaela_bookings
      WHERE id = ${validatedData.id};
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

export const getAllBookings = async () => {
  try {
    const result = await sql`
      SELECT * FROM bookings;
    `;
    return result.rows as Booking[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
