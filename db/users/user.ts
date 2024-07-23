import { z } from 'zod';

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  phone?: string;
  bio?: string;
  birthday?: string;
  address?: string;
  image?: string;
  color: string;
}

export const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  first_name: z.string().min(1, { message: 'First name is required' }).max(255, { message: 'First name is too long' }).optional(),
  last_name: z.string().min(1, { message: 'Last name is required' }).max(255, { message: 'Last name is too long' }).optional(),
  address: z.string().max(255, { message: 'Address is too long' }).optional(),
  birthday: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' })
    .optional(),
  bio: z.string().max(5000, { message: 'Bio is too long' }).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: 'Invalid color format' }),
});
