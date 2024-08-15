'use server';

import { questions } from '@/app/dotaznik/configuration';
import { sql } from '@vercel/postgres';
import { createQuestionnaire } from './createQuestionnaire';

export const updateQuestionnaire = async (formData: FormData) => {
  try {
    const configuration = JSON.stringify(questions);
    const questionnaire_id = 1; //formData.get('questionnaire_id')?.toString();

    await sql`
     DELETE FROM michaela_questionnaires
      `;

    await createQuestionnaire(formData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
