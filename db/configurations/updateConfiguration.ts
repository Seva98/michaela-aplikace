'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { configurationSchema } from './configuration';
import { idSchema } from '../_tables/idSchema';

export const updateConfiguration = async (formData: FormData) => {
  try {
    const configurationData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
      days: formData.get('days') ? parseInt(formData.get('days')?.toString() || '0', 10) : undefined,
      price: formData.get('price') ? parseFloat(formData.get('price')?.toString() || '0') : undefined,
      expiration: formData.get('expiration')?.toString(),
    };

    const validatedData = configurationSchema.extend({ ...idSchema }).parse(configurationData);

    const result = await sql`
      UPDATE michaela_configurations
      SET
        days = COALESCE(${validatedData.days}, days),
        price = COALESCE(${validatedData.price}, price),
        expiration = COALESCE(${validatedData.expiration}, expiration)
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
