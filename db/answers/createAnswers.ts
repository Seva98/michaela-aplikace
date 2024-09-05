'use server';

import { Question, QuestionKey, QuestionType } from '@/app/dotaznik/configuration';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { User } from '../users/user';
import { toPositiveNumber } from '@/utils/number';

export const addPageToQuestionnaire = async (formData: FormData) => {
  try {
    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    configuration.push([]);

    console.log(configuration);

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${JSON.stringify(configuration)}
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
    const newEntries = Array.from(formData.entries()).filter(([key]) => validKeys.has(key as keyof Question));
    const newQuestion = Object.fromEntries(newEntries) as Partial<Question>;

    const questionnaire_id = formData.get('questionnaire_id')?.toString();
    const group_id = toPositiveNumber(formData.get('group_id')?.toString());
    if (group_id < 0) throw new Error('Question Group ID not provided');

    const owner_id = await getOwnerId();
    const questionnaires = await sql`
      SELECT configuration FROM michaela_questionnaires
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id};`;

    const configuration = JSON.parse(questionnaires.rows[0].configuration) as Question[][];
    configuration[group_id].push(newQuestion as Question);

    await sql`
      UPDATE michaela_questionnaires
      SET configuration = ${JSON.stringify(configuration)}
      WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    `;
    //   console.log(cleanedQuestion);

    // const result = await sql`
    //   UPDATE michaela_questionnaires
    //   SET configuration = ${JSON.stringify(parsedQuestions)}
    //   WHERE questionnaire_id = ${questionnaire_id} AND owner_id = ${owner_id}
    //   RETURNING *;
    // `;
    // return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
