'use server';

import { Question } from '@/app/profile/questionnaire/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { toPositiveNumber } from '@/utils/number';
import { sql } from '@vercel/postgres';
import { updateQuestionnaire } from './updateQuestionnaire';

export const deleteQuestionnaire = async (formData: FormData) => {
  const questionnaire_id = parseInt(formData.get('questionnaire_id')?.toString() || '0', 10);
  const owner_id = await getOwnerId();

  await sql`
      DELETE FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
      RETURNING questionnaire_id;
    `;
};

export const deleteQuestionnaireQuestion = async (formData: FormData) => {
  const questionnaire_id = toPositiveNumber(formData.get('questionnaire_id')?.toString());
  if (questionnaire_id < 0) throw new Error('Question Questionnaire ID not provided');
  const groupIndex = toPositiveNumber(formData.get('groupIndex')?.toString());
  if (groupIndex < 0) throw new Error('Question Group Index not provided');
  const questionIndex = toPositiveNumber(formData.get('questionIndex')?.toString());
  if (questionIndex < 0) throw new Error('Question Question Index not provided');

  const owner_id = await getOwnerId();
  const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

  const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
  configuration[groupIndex].splice(questionIndex, 1);

  await updateQuestionnaire(questionnaire_id, configuration);
};
