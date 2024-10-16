'use server';

import { questions } from '@/app/profile/questionnaire/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const createQuestionnaire = async () => {
  try {
    const configuration = JSON.stringify([]);
    const owner_id = await getOwnerId();
    const name = 'Nový dotazník';

    const result = await sql`
      INSERT INTO michaela_questionnaires (configuration, owner_id, name)
      VALUES (${configuration}, ${owner_id}, ${name})
      RETURNING questionnaire_id;
    `;

    return result.rows[0] as { questionnaire_id: number };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
