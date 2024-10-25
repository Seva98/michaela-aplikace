'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const createQuestionnaire = async () => {
  const configuration = JSON.stringify([]);
  const owner_id = await getOwnerId();
  const name = 'Nový dotazník';

  const result = await sql`
      INSERT INTO michaela_questionnaires (configuration, owner_id, name)
      VALUES (${configuration}, ${owner_id}, ${name})
      RETURNING questionnaire_id;
    `;

  return result.rows[0] as { questionnaire_id: number };
};
