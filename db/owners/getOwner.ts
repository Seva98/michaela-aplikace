import { sql } from '@vercel/postgres';
import { Owner } from './owner';

export const getOwnerByEmail = async (email?: string) => {
  try {
    if (!email) return null;

    const result = await sql`
    SELECT *
    FROM michaela_owners
    WHERE email = ${email}
    `;

    return result.rows[0] as Owner;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getOwnerIdByEmail = async (email: string) => {
  try {
    if (!email) return null;

    const result = await sql`
    SELECT owner_id
    FROM michaela_owners
    WHERE email = ${email}
    `;

    return result.rows[0]?.owner_id as number;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
