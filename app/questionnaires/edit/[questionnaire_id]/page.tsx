import Section from '@/components/containers/section';
import { checkAdmin } from '@/utils/roles';
import Preview from './preview';
import CurrentConfiguration from './currentConfiguration';
import QuestionnaireName from './questionnaireName';
import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';

export type QuestionnaireEditParams = {
  params: {
    questionnaire_id: string;
  };
};

const Page = async ({ params }: QuestionnaireEditParams) => {
  await checkAdmin();
  const questionnaire = await getQuestionnaireById(parseInt(params.questionnaire_id));

  return (
    <Section title="Editace dotazníku">
      <QuestionnaireName name={questionnaire.name} questionnaire_id={params.questionnaire_id} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CurrentConfiguration params={params} />
        <Preview params={params} />
      </div>
    </Section>
  );
};

export default Page;
