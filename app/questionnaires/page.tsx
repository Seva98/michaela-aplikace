import Section from '@/components/containers/section';
import Questionnaires from './questionnaires';
import QuestionnairesHeader from './questionnairesHeader';

const Page = async () => {
  const gridClass = 'grid grid-cols-[1fr_auto_1fr] gap-2 items-center';

  return (
    <Section title="Dotazníky">
      <div className="flex flex-col gap-4 shadow-lg w-fit  border border-gray-100 p-4">
        <Questionnaires gridClass={gridClass} />
      </div>
    </Section>
  );
};

export default Page;
