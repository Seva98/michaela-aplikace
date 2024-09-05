import Section from '@/components/containers/section';
import { checkAdmin } from '@/utils/roles';
import Preview from './preview';
import CurrentConfiguration from './currentConfiguration';

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
        <CurrentConfiguration params={params} />
        <Preview params={params} />
      </div>
    </Section>
  );
};

export default Page;
