import Section from '@/components/containers/section';
import Questionnaires from './questionnaires';
import QuestionnairesHeader from './questionnairesHeader';

const Page = async () => {
  const gridClass = 'grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 items-center';

  return (
    <Section title="Dotazníky">
      <div className="flex flex-col gap-4 ">
        <Questionnaires gridClass={gridClass} />
      </div>
    </Section>
  );
};

export default Page;
