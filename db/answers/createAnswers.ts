'use server';

import { Question } from '@/app/dotaznik/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { User } from '../users/user';

export const assignQuestionnaire = async (formData: FormData) => {
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

    if (foundQuestionnaire.rowCount) throw new Error('Questionnaire already assigned');

    const parsedAnswers = JSON.parse(questionnaires.rows[0].configuration) as Question[];
    const user = await sql`
      SELECT * FROM michaela_users
      WHERE user_id = ${user_id};`;
    const foundUser = user.rows[0] as User;

    const keys = ['first_name', 'last_name', 'email', 'phone', 'birthday'];
    keys.forEach((key) => {
      const foundAnswer = parsedAnswers.find((question) => question.name === key);
      if (!foundAnswer) return;
      switch (key) {
        case 'first_name':
          foundAnswer.value = foundUser.first_name;
          break;
        case 'last_name':
          foundAnswer.value = foundUser.last_name;
          break;
        case 'email':
          foundAnswer.value = foundUser.email;
          break;
        case 'phone':
          foundAnswer.value = foundUser.phone;
          break;
        case 'birthday':
          foundAnswer.value = foundUser.birthday;
          break;
        default:
          break;
      }
    });

    const result = await sql`
      INSERT INTO michaela_answers (questionnaire_id, user_id, owner_id, answer)
      VALUES (${questionnaire_id}, ${user_id}, ${owner_id}, ${questionnaires.rows[0].configuration})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const overwriteQuestionnaire = async (formData: FormData) => {
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

    const parsedAnswers = JSON.parse(questionnaires.rows[0].configuration) as Question[];
    const user = await sql`
      SELECT * FROM michaela_users
      WHERE user_id = ${user_id};`;
    const foundUser = user.rows[0] as User;

    const keys = ['first_name', 'last_name', 'email', 'phone', 'birthday'];
    keys.forEach((key) => {
      const foundAnswer = parsedAnswers.find((question) => question.name === key);
      if (!foundAnswer) return;
      switch (key) {
        case 'first_name':
          foundAnswer.value = foundUser.first_name;
          break;
        case 'last_name':
          foundAnswer.value = foundUser.last_name;
          break;
        case 'email':
          foundAnswer.value = foundUser.email;
          break;
        case 'phone':
          foundAnswer.value = foundUser.phone;
          break;
        case 'birthday':
          foundAnswer.value = foundUser.birthday;
          break;
        default:
          break;
      }
    });

    const result = await sql`
      INSERT INTO michaela_answers (questionnaire_id, user_id, owner_id, answer)
      VALUES (${questionnaire_id}, ${user_id}, ${owner_id}, ${JSON.stringify(parsedAnswers)})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
