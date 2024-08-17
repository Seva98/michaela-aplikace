import Loader from '@/components/common/loader';
import Section from '@/components/containers/section';
import Typography from '@/components/ui/typography';
import { createQuestionnaire } from '@/db/questionnaires/createQuestionnaire';
import { getQuestionnaireById } from '@/db/questionnaires/getQuestionnaire';
import { checkAdmin } from '@/utils/roles';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import Configuration from './configuration';
import Preview from './preview';

export type QuestionnaireEditParams = {
  params: {
    questionnaire_id: string;
  };
};

const Page = async ({ params }: QuestionnaireEditParams) => {
  await checkAdmin();

  return (
    <Section title="Nový dotazník">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Configuration params={params} />
        <Preview params={params} />
      </div>
    </Section>
  );
};

export default Page;
