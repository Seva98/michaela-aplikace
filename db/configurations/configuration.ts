import { z } from 'zod';

export interface Configuration {
  id: number;
  name: string;
  days: number;
  price: number;
  expiration: number;
}

export const configurationSchema = z.object({
  name: z.string().min(1, { message: 'Name must be a non-empty string' }).optional(),
  days: z.number().int().min(1, { message: 'Days must be a positive integer' }).optional(),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }).optional(),
  expiration: z.number().min(0, { message: 'Expiration must be a non-negative number' }).optional(),
});
