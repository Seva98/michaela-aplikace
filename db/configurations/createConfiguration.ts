'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { configurationSchema } from './configuration';
import { revalidatePath } from 'next/cache';

export const createConfiguration = async (formData: FormData) => {
  try {
    const configurationData = {
      name: formData.get('name')?.toString(),
      days: parseInt(formData.get('days')?.toString() || '0', 10),
      price: parseFloat(formData.get('price')?.toString() || '0'),
      expiration: parseInt(formData.get('expiration')?.toString() || '0', 10),
    };
    const validatedData = configurationSchema.parse(configurationData);

    const result = await sql`
      INSERT INTO michaela_configurations (name, days, price, expiration)
      VALUES (${validatedData.name}, ${validatedData.days}, ${validatedData.price}, ${validatedData.expiration})
      RETURNING *;
    `;
    revalidatePath('/');
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
