'use server';

import { questions } from '@/app/dotaznik/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const createQuestionnaire = async (formData: FormData) => {
  try {
    const configuration = JSON.stringify(questions);
    // const configuration = formData.get('configuration')?.toString();
    const owner_id = await getOwnerId();
    const name = formData.get('name')?.toString();

    console.log(formData);

    const result = await sql`
      INSERT INTO michaela_questionnaires (configuration, owner_id, name)
      VALUES (${configuration}, ${owner_id}, ${name})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
