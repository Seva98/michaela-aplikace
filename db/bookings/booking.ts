import { z } from 'zod';

export interface Booking {
  id: number;
  date: string; // Use string and convert to Date object when necessary
  userId: number;
  configurationId: number;
}

export const bookingSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
  userId: z.number().int().positive({ message: 'User ID must be a positive integer' }),
  configurationId: z.number().int().positive({ message: 'Configuration ID must be a positive integer' }),
});
