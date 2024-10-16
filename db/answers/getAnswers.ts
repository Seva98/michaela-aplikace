import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { Answer } from './answer';
import { checkValidUser } from '@/utils/db/user/checkValidUser';

export const getAnswers = async () => {
  try {
    const owner_id = await getOwnerId();

    const result = await sql`
      SELECT * FROM michaela_questionnaire_answers
      WHERE owner_id = ${owner_id};
    `;
    return result.rows as Answer[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAsnwersByUser = async (answer_id?: number, user_id?: number) => {
  try {
    await checkValidUser(user_id);
    const result = await sql`
      SELECT * FROM michaela_questionnaire_answers
      WHERE user_id = ${user_id} AND answer_id = ${answer_id};
    `;
    return result.rows[0] as Answer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnswersById = async (answer_id: number) => {
  try {
    const ownerId = await getOwnerId();

    const result = await sql`
      SELECT * FROM michaela_questionnaire_answers
      WHERE answer_id = ${answer_id} AND owner_id = ${ownerId};
    `;
    return result.rows[0] as Answer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
