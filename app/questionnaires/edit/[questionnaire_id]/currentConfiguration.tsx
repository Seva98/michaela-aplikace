import Typography from '@/components/ui/typography';
import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';

import { QuestionnaireEditParams } from './page';
import { Question } from '@/app/profile/questionnaire/configuration';
import EditCurrentConfiguration from './editCurrentConfiguration';

const CurrentConfiguration = async ({ params }: QuestionnaireEditParams) => {
  const { questionnaire_id } = await params;
  const questionnaire = await getQuestionnaireById(parseInt(questionnaire_id));
  const questions = JSON.parse(questionnaire.configuration) as Question[][];

  return (
    <div className="flex flex-col gap-2 shadow-lg w-full  border border-gray-100 p-4">
      <Typography variant="h2">Konfigurace</Typography>
      <EditCurrentConfiguration questionnaireQuestions={questions} questionnaire_id={questionnaire_id} />
    </div>
  );
};

export default CurrentConfiguration;
