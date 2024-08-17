import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';
import { unstable_noStore } from 'next/cache';
import { QuestionnaireEditParams } from './page';
import Typography from '@/components/ui/typography';
import EditConfiguration from './editConfiguration';
import { Question } from '@/app/dotaznik/configuration';
import { addQuestionToQuestionnaire } from '@/db/answers/createAnswers';

const Configuration = async ({ params }: QuestionnaireEditParams) => {
  unstable_noStore();
  const questionnaire = await getQuestionnaireById(parseInt(params.questionnaire_id));
  const questions = JSON.parse(questionnaire.configuration) as Question[];

  return (
    <div className="flex flex-col gap-2 shadow-lg w-full  border border-gray-100 p-4">
      <Typography variant="h2">Konfigurace</Typography>
      {questions.map(({ text, type, answers, description, disabled, group, name, placeholder, required, value }, i) => (
        <div className="flex gap-1" key={`question-${i}`}>
          <div>{text}</div>
        </div>
      ))}
      <hr />
      <EditConfiguration action={addQuestionToQuestionnaire} variant="create" questionnaire_id={parseInt(params.questionnaire_id)} />
    </div>
  );
};

export default Configuration;
