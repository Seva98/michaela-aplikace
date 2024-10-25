'use server';

import { sql } from '@vercel/postgres';
import { Answer } from './answer';
import { Question } from '@/app/profile/questionnaire/configuration';

export const updateAnswers = async (formData: FormData) => {
  const answers = Array.from(formData.entries()).map(([key, value]) => ({ key, value }));
  const user_id = formData.get('user_id')?.toString();
  const answer_id = formData.get('answer_id')?.toString();
  const current_progress = parseInt(formData.get('current_progress')?.toString() ?? '0');

  const answerResponse = await sql`
    SELECT * FROM michaela_questionnaire_answers WHERE user_id = ${user_id} AND answer_id = ${answer_id}`;
  const { answer, current_progress: existing_progress } = answerResponse.rows[0] as Answer;

  const parsedAnswers = JSON.parse(answer) as Question[][];
  parsedAnswers.forEach((questionArray, i) => {
    questionArray.forEach((parsedAnswer, j) => {
      const foundAnswer = answers.find((answer) => answer.key === parsedAnswer.name);
      if (foundAnswer) {
        parsedAnswer.value = foundAnswer.value.toString();
      }
    });
  });

  const new_progress = current_progress > existing_progress ? current_progress : existing_progress;

  await sql`
    UPDATE michaela_questionnaire_answers
    SET answer = ${JSON.stringify(parsedAnswers)}, current_progress = ${new_progress}, last_updated = NOW()
    WHERE user_id = ${user_id} AND answer_id = ${answer_id}`;
};
