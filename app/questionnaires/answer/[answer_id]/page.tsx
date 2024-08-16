import Section from '@/components/containers/section';
import FormattedAnswer from './formattedAnswer';

export type AnswerParams = { params: { answer_id: string } };

const Page = async ({ params }: AnswerParams) => {
  return (
    <Section title="Odpovědi">
      <FormattedAnswer params={params} />
    </Section>
  );
};

export default Page;
