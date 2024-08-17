'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const deleteQuestionnaire = async (formData: FormData) => {
  try {
    const questionnaire_id = parseInt(formData.get('questionnaire_id')?.toString() || '0', 10);
    const owner_id = await getOwnerId();

    const result = await sql`
      DELETE FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
      RETURNING questionnaire_id;
    `;

    return result.rows[0] as { questionnaire_id: number };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
