import Questionnaire from '../questionnaire';

export type QuestionnaireParams = {
  params: Promise<{
    answer_id: string;
    current_progress?: string;
  }>;
};

const Page = async ({ params }: {} & QuestionnaireParams) => {
  return <Questionnaire params={params} />;
};

export default Page;
