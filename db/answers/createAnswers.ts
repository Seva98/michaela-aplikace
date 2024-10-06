'use server';

import { Question, QuestionKey } from '@/app/dotaznik/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { User } from '../users/user';

export const assignQuestionnaireToUser = async (formData: FormData) => {
  const questionnaire_id = formData.get('questionnaire_id')?.toString();
  const user_id = formData.get('user_id')?.toString();

  try {
    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    if (!questionnaires.rowCount) throw new Error('Questionnaire not found');

    const foundQuestionnaire = await sql`
      SELECT * FROM michaela_answers
      WHERE questionnaire_id = ${questionnaire_id} AND user_id = ${user_id} AND owner_id = ${owner_id};`;

    if (foundQuestionnaire.rowCount) {
      await sql`
        DELETE FROM michaela_answers
        WHERE questionnaire_id = ${questionnaire_id} AND user_id = ${user_id} AND owner_id = ${owner_id};`;
    }

    const parsedAnswers = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    const user = await sql`
      SELECT * FROM michaela_users
      WHERE user_id = ${user_id};`;
    const foundUser = user.rows[0] as User;

    const keys = ['first_name', 'last_name', 'email', 'phone', 'birthday'];

    parsedAnswers.forEach((questionsArray) => {
      questionsArray.forEach((question) => {
        if (keys.includes(question[QuestionKey.KEY] ?? '')) {
          switch (question.key) {
            case 'first_name':
              question.value = foundUser.first_name;
              break;
            case 'last_name':
              question.value = foundUser.last_name;
              break;
            case 'email':
              question.value = foundUser.email;
              break;
            case 'phone':
              question.value = foundUser.phone;
              break;
            case 'birthday':
              question.value = foundUser.birthday;
              break;
            default:
              break;
          }
        }
      });
    });

    const result = await sql`
      INSERT INTO michaela_answers (questionnaire_id, user_id, owner_id, answer, total_questions)
      VALUES (${questionnaire_id}, ${user_id}, ${owner_id}, ${JSON.stringify(parsedAnswers)}, ${parsedAnswers.length})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
