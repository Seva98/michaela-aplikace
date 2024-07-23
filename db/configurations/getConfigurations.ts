import 'server-only';
import { zId } from '../_tables/idSchema';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { Configuration } from './configuration';

export const getConfigurationById = async (formData: FormData) => {
  try {
    const getData = {
      id: parseInt(formData.get('id')?.toString() || '0', 10),
    };

    const validatedData = zId.parse(getData);

    const result = await sql`
      SELECT * FROM michaela_configurations
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

export const getAllConfigurations = async () => {
  try {
    const result = await sql`
      SELECT * FROM michaela_configurations;
    `;
    return result.rows as Configuration[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
