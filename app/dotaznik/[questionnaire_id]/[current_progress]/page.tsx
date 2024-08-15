import Questionnaire from '../../questionnaire';
import { QuestionnaireParams } from '../page';

const Page = async ({ params }: {} & QuestionnaireParams) => {
  return <Questionnaire params={params} />;
};

export default Page;
