import { Question as QuestionType } from './configuration';
import Typography from '@/components/ui/typography';
import QuestionsGroup from './questionsGroup';
import NavigationAndProgress from './navigationAndProgress';
import Question from './question';
import { updateAnswers } from '@/db/answers/updateAnswers';
import { unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';
import { getUserByEmail } from '@/db/users/getUsers';
import { getAsnwersByUser } from '@/db/answers/getAnswers';
import { QuestionnaireParams } from './[questionnaire_id]/page';

const Questionnaire = async ({ params: { questionnaire_id, current_progress = '1' } }: {} & QuestionnaireParams) => {
  unstable_noStore();
  const parsedQuestionnaireId = parseInt(questionnaire_id);
  const parsedCurrentProgress = parseInt(current_progress) >= 1 ? parseInt(current_progress) : 1;

  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  const { current_progress: answerProgress, answer, answer_id } = await getAsnwersByUser(parsedQuestionnaireId, user?.user_id);
  if (parsedCurrentProgress - 1 > answerProgress) redirect(`/dotaznik/${questionnaire_id}/${answerProgress + 1}`);

  const questions = JSON.parse(answer) as QuestionType[][];
  const totalQuestions = questions.flat().length;

  const questionGroupToRender = questions[parsedCurrentProgress - 1];

  const updateAnswerAndRedirect = async (formData: FormData) => {
    'use server';
    try {
      await updateAnswers(formData);
      redirect(`/dotaznik/${questionnaire_id}/${parsedCurrentProgress + 1}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form className="flex flex-col p-8 h-screen w-screen justify-between items-center" action={updateAnswerAndRedirect}>
      <Typography variant="h1">Vstupní dotázník</Typography>
      <div className="relative w-full max-w-md flex items-center">
        <QuestionsGroup index={parsedCurrentProgress} currentPage={parsedCurrentProgress}>
          {questionGroupToRender.map((question, questionIndex) => (
            <Question question={question} key={questionIndex} />
          ))}
        </QuestionsGroup>
      </div>
      <NavigationAndProgress
        questionnaire_id={parsedQuestionnaireId}
        currentPage={parsedCurrentProgress}
        currentMaxProgress={answerProgress}
        totalQuestions={totalQuestions}
      />
      <input type="hidden" name="answer_id" value={answer_id} />
      <input type="hidden" name="user_id" value={user?.user_id} />
      <input type="hidden" name="current_progress" value={parsedCurrentProgress} />
    </form>
  );
};

export default Questionnaire;
