import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { Questionnaire } from './questionnaire';
import { sql } from '@vercel/postgres';
import { Answer } from '../answers/answer';

export const getQuestionnaires = async () => {
  try {
    const owner_id = await getOwnerId();
    const result = await sql`
      SELECT * FROM michaela_questionnaires
      WHERE owner_id = ${owner_id};
    `;
    return result.rows as Questionnaire[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionnaireById = async (questionnaire_id: number) => {
  try {
    const owner_id = await getOwnerId();
    const result = await sql`
      SELECT * FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};
    `;
    return result.rows[0] as Questionnaire;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserQuestionnaires = async (user_id?: number) => {
  try {
    const result = await sql`
      SELECT 
          a.answer_id,
          a.user_id,
          a.owner_id,
          a.questionnaire_id,
          q.name, 
          a.answer,
          a.current_progress,
          a.total_questions
      FROM 
          public.michaela_questionnaire_answers a
      JOIN 
          public.michaela_questionnaires q ON a.questionnaire_id = q.questionnaire_id
      WHERE user_id = ${user_id}
      ORDER BY answer_id;
    `;
    return result.rows as Array<{ name: string } & Answer>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
