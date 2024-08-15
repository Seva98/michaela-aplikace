'use server';

import { sql } from '@vercel/postgres';
import { Answer } from './answer';
import { Question } from '@/app/dotaznik/configuration';

export const updateAnswers = async (formData: FormData) => {
  try {
    const answers = Array.from(formData.entries()).map(([key, value]) => ({ key, value }));
    const user_id = formData.get('user_id')?.toString();
    const answer_id = formData.get('answer_id')?.toString();
    const current_progress = parseInt(formData.get('current_progress')?.toString() ?? '0');

    const answerResponse = await sql`
    SELECT * FROM michaela_answers WHERE user_id = ${user_id} AND answer_id = ${answer_id}`;
    const { answer, current_progress: existing_progress } = answerResponse.rows[0] as Answer;

    const parsedAnswers = JSON.parse(answer) as Question[];
    answers.forEach((answer) => {
      const foundAnswer = parsedAnswers.find((parsedAnswer) => parsedAnswer.name === answer.key);
      if (!foundAnswer) return;
      foundAnswer.value = answer.value.toString();
    });

    const new_progress = current_progress > existing_progress ? current_progress : existing_progress;

    await sql`
    UPDATE michaela_answers
    SET answer = ${JSON.stringify(parsedAnswers)}, current_progress = ${new_progress} 
    WHERE user_id = ${user_id} AND answer_id = ${answer_id}`;

    return answers;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateUserAnswers = async (formData: FormData) => {
  try {
    const birthday = formData.get('birthday')?.toString();
    const phone = formData.get('phone')?.toString();
    await updateAnswers(formData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
