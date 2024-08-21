'use server';

import { groupQuestions } from './../../app/dotaznik/configuration';
import { Question, questions } from '@/app/dotaznik/configuration';
import { sql } from '@vercel/postgres';
import { createQuestionnaire } from './createQuestionnaire';
import { getQuestionnaireById } from './getQuestionnaire';

export const updateQuestionnaire = async (formData: FormData) => {
  try {
    const configuration = JSON.stringify(questions);
    const questionnaire_id = 1; //formData.get('questionnaire_id')?.toString();

    await sql`
     DELETE FROM michaela_questionnaires
      `;

    await createQuestionnaire();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateQuestionnaireOrder = async (
  questionnaire_id: number,
  dragging: { groupIndex: number; questionIndex: number },
  dropping: { groupIndex: number; questionIndex: number },
) => {
  try {
    const questionnaire = await getQuestionnaireById(questionnaire_id);
    const questions = JSON.parse(questionnaire.configuration) as Question[];
    const groupedQuestions = groupQuestions(questions);
    const newGroupName = groupedQuestions[dropping.groupIndex][0].group;

    console.log(dragging, dropping);

    console.log(questions);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
