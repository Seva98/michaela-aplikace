import 'server-only';
import { zId } from '../_tables/idSchema';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { Subscription } from './subscription';

export const getSubscriptions = async () => {
  const result = await sql`
      SELECT * FROM michaela_subscriptions;
    `;
  return result.rows as Subscription[];
};

export const getSubscriptionByUserId = async (formData: FormData) => {
  try {
    const getData = {
      userId: parseInt(formData.get('userId')?.toString() || '0', 10),
    };

    const validatedData = zId.parse(getData);

    const result = await sql`
      SELECT * FROM michaela_subscriptions
      WHERE user_id = ${validatedData.id};
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

  // try {
  //   const getData = {
  //     id: parseInt(formData.get('id')?.toString() || '0', 10),
  //   };

  //   const validatedData = zId.parse(getData);

  //   const result = await sql`
  //     SELECT * FROM michaela_configurations
  //     WHERE id = ${validatedData.id};
  //   `;
  //   return result.rows[0];
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     console.error('Validation error:', error.errors);
  //     throw new Error('Invalid input data');
  //   }
  //   console.error(error);
  //   throw error;
  // }
};
