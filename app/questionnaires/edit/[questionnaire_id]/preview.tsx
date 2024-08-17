import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';
import { unstable_noStore } from 'next/cache';
import { QuestionnaireEditParams } from './page';
import Typography from '@/components/ui/typography';
import { groupQuestions, Question as QuestionType } from '@/app/dotaznik/configuration';
import Question from '@/app/dotaznik/question';

const Preview = async ({ params }: QuestionnaireEditParams) => {
  unstable_noStore();
  const questionnaire = await getQuestionnaireById(parseInt(params.questionnaire_id));
  const questions = JSON.parse(questionnaire.configuration) as QuestionType[];
  const groupedQuestions = groupQuestions(questions);

  return (
    <div className="shadow-lg w-full  border border-gray-100 p-4">
      <Typography variant="h2">Dotazník</Typography>
      <div className="flex flex-col gap-8 items-center">
        {groupedQuestions.map((questions, i) => (
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
