import { sql } from '@vercel/postgres';

export const getOwnerIdByEmail = async (email: string) => {
  try {
    if (!email) return null;

    const result = await sql`
    SELECT owner_id
    FROM michaela_owners
    WHERE email = ${email}
    `;

    if (result.rowCount === 0) throw new Error('Owner not found');
    return result.rows[0].owner_id as number;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
