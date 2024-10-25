'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const deleteAnswers = async (formData: FormData) => {
  const answer_id = formData.get('answer_id')?.toString();
  const user_id = formData.get('user_id')?.toString();

  const owner_id = await getOwnerId();

  await sql`
        DELETE FROM michaela_questionnaire_answers
        WHERE answer_id = ${answer_id} AND user_id = ${user_id} AND owner_id = ${owner_id};`;
};
