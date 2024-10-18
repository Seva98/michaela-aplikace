'use server';

import { Question, QuestionKey, questions } from '@/app/profile/questionnaire/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { getNormalizedQuestionnaire } from '@/utils/db/questionnaire/getNormalizedQuestionnaire';
import { toPositiveNumber } from '@/utils/number';
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

export const updateQuestionnaireName = async (formData: FormData) => {
  try {
    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const name = formData.get('name')?.toString();
    const owner_id = await getOwnerId();

    await sql`
      UPDATE michaela_questionnaires
      SET name = ${name}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPageToQuestionnaire = async (formData: FormData) => {
  try {
    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    configuration.push([]);

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${getNormalizedQuestionnaire(configuration)}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addQuestionToQuestionnaire = async (formData: FormData) => {
  try {
    const validKeys = new Set(Object.values(QuestionKey) as (keyof Question)[]);
    const newEntries = Array.from(formData.entries())
      .filter(([key]) => validKeys.has(key as keyof Question))
      .map(([key, value]) => {
        if (key === 'required' || key === 'disabled') {
          return [key, value === 'true'];
        }
        return [key, value];
      });
    const newQuestion = Object.fromEntries(newEntries) as Partial<Question>;

    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const group_id = toPositiveNumber(formData.get('group_id')?.toString());
    if (group_id < 0) throw new Error('Question Group ID not provided');

    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    const answers = formData.get('answers')?.toString();
    if (answers) newQuestion.answers = JSON.parse(answers);
    configuration[group_id].push(newQuestion as Question);

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${getNormalizedQuestionnaire(configuration)}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editQuestionInQuestionnaire = async (formData: FormData) => {
  try {
    const validKeys = new Set(Object.values(QuestionKey) as (keyof Question)[]);
    const newEntries = Array.from(formData.entries())
      .filter(([key]) => validKeys.has(key as keyof Question))
      .map(([key, value]) => {
        if (key === 'required' || key === 'disabled') {
          return [key, value === 'true'];
        }
        return [key, value];
      });
    const newQuestion = Object.fromEntries(newEntries) as Partial<Question>;

    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const group_id = toPositiveNumber(formData.get('group_id')?.toString());
    if (group_id < 0) throw new Error('Question Group ID not provided');
    const question_id = toPositiveNumber(formData.get('question_id')?.toString());
    if (question_id < 0) throw new Error('Question ID not provided');

    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    const answers = formData.get('answers')?.toString();
    if (answers) newQuestion.answers = JSON.parse(answers);
    configuration[group_id][question_id] = newQuestion as Question;

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${getNormalizedQuestionnaire(configuration)}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
