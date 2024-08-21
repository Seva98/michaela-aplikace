'use client';

import { unstable_noStore } from 'next/cache';
import { QuestionnaireEditParams } from './page';
import { Question as QuestionInterface, QuestionType } from '@/app/dotaznik/configuration';
import { addQuestionToQuestionnaire } from '@/db/answers/createAnswers';
import EditQuestion from './editQuestion';
import Question from '@/app/dotaznik/question';
import { useCallback, useState } from 'react';
import Typography from '@/components/ui/typography';

const NewQuestion = ({ params }: QuestionnaireEditParams) => {
  unstable_noStore();
  const [newQuestion, setNewQuestion] = useState<QuestionInterface>({ text: ``, type: QuestionType.INFO });

  const onQuestionChange = useCallback((question: QuestionInterface) => {
    setNewQuestion(question);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col gap-2 shadow-lg w-full  border border-gray-100 p-4">
        <EditQuestion
          action={addQuestionToQuestionnaire}
          variant="create"
          questionnaire_id={parseInt(params.questionnaire_id)}
          onQuestionChange={onQuestionChange}
        />
      </div>
      <div className="flex flex-col gap-2 shadow-lg w-full  border border-gray-100 p-4">
        <Typography variant="h3">Náhled otázky</Typography>
        <div className="flex h-full justify-center items-center">
          <Question question={newQuestion} />
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
