import Loader from '@/components/common/loader';
import Section from '@/components/containers/section';
import { createQuestionnaire } from '@/db/questionnaires/createQuestionnaire';
import { checkAdmin } from '@/utils/roles';
import { redirect } from 'next/navigation';

const Page = async () => {
  await checkAdmin();

  const { questionnaire_id } = await createQuestionnaire();
  redirect(`/questionnaires/edit/${questionnaire_id}`);

  return (
    <Section title="Nový dotazník" className="text-center">
      <div className="w-fit h-fit mx-auto">
        <Loader />
      </div>
    </Section>
  );
};

export default Page;
