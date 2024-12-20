import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';

import { QuestionnaireEditParams } from './page';
import Typography from '@/components/ui/typography';
import { Question as QuestionType } from '@/app/profile/questionnaire/configuration';
import Question from '@/app/profile/questionnaire/question';
import { useState } from 'react';

const Preview = async ({ params }: QuestionnaireEditParams) => {
  const { questionnaire_id } = await params;
  const questionnaire = await getQuestionnaireById(parseInt(questionnaire_id));
  const questions = JSON.parse(questionnaire.configuration) as QuestionType[][];

  return (
    <div className="shadow-lg w-full  border border-gray-100 p-4">
      <Typography variant="h2">Náhled dotazníku</Typography>
      <div className="flex flex-col gap-8 items-center">
        {questions.map((questions, i) => (
          <div className="max-w-md w-full" key={`question-group-preview-${i}`}>
            <div className="font-semibold mb-1">Strana č.{i + 1}</div>
            <div className="flex flex-col gap-4 shadow-lg  border border-gray-100 p-4">
              {questions.map((question, j) => (
                <Question question={question} key={`question-preview-${i}-${j}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
