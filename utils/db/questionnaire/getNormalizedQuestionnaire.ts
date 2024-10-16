import { Question } from '@/app/profile/questionnaire/configuration';

export const getNormalizedQuestionnaire = (questionnaire: Question[][]) =>
  JSON.stringify(
    questionnaire.map((questions, i) =>
      questions.map((question, j) => ({
        ...question,
        name: `question-${i + 1}-${j + 1}`,
      })),
    ),
  );
