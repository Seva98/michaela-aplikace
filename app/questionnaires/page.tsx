import Section from '@/components/containers/section';
import Questionnaires from './questionnaires';

const Page = async () => {
  return (
    <Section title="Dotazníky">
      <Questionnaires />
    </Section>
  );
};

export default Page;
