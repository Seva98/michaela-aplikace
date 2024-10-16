import { User } from '@/db/users/user';
import 'server-only';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const getUserById = async (user_id: number) => {
  const owner_id = await getOwnerId();

  try {
    const result = await sql`
    SELECT 
      michaela_users.*,
      birthday::text AS birthday,
      created_at::text AS created_at
    FROM michaela_users
    WHERE user_id = ${user_id} AND owner_id = ${owner_id};
    `;
    return result.rows[0] as User;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data');
    }
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    if (!email) return null;

    const result = await sql`
    SELECT 
      michaela_users.*,
      birthday::text AS birthday,
      created_at::text AS created_at
    FROM michaela_users
    WHERE email = ${email};
    `;
    return result.rows[0] as User;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data');
    }
    console.error(error);
    throw error;
  }
};

export const getUserIdByEmail = async (email: string) => {
  try {
    if (!email) return null;

    const result = await sql`
    SELECT 
      user_id
    FROM michaela_users
    WHERE email = ${email};
    `;
    return result.rows[0].owner_id as number;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data');
    }
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const owner_id = await getOwnerId();

  try {
    const result = await sql`
      SELECT * FROM michaela_users
      WHERE owner_id = ${owner_id}
      ORDER BY "order";
    `;
    return result.rows as User[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
