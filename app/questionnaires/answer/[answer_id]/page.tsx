import Section from '@/components/containers/section';
import FormattedAnswers from './formattedAnswers';

export type AnswerParams = { params: Promise<{ answer_id: string }> };

const Page = async ({ params }: AnswerParams) => {
  return (
    <Section title="Odpovědi">
      <FormattedAnswers params={params} />
    </Section>
  );
};

export default Page;
