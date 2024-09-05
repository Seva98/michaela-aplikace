'use server';

import { Question, questions } from '@/app/dotaznik/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const updateQuestionnaire = async (questionnaire_id: number, questionnaire: Question[][]) => {
  try {
    const owner_id = await getOwnerId();

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${JSON.stringify(questionnaire)}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
