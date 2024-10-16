import { QuestionType, Question as QuestionObj } from './configuration';
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
import { QuestionnaireParams } from './[answer_id]/page';
import Link from 'next/link';

const Questionnaire = async ({ params: { answer_id, current_progress = '1' } }: {} & QuestionnaireParams) => {
  unstable_noStore();
  const parsedAnswerId = parseInt(answer_id);
  const parsedCurrentProgress = parseInt(current_progress) >= 1 ? parseInt(current_progress) : 1;

  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  const answers = await getAsnwersByUser(parsedAnswerId, user?.user_id);
  const { current_progress: answerProgress, total_questions, answer } = answers;
  if (parsedCurrentProgress - 1 > answerProgress) redirect(`/profile/questionnaire/${parsedAnswerId}/${answerProgress + 1}`);

  const questions = JSON.parse(answer) as QuestionObj[][];

  const questionGroupToRender = questions[parsedCurrentProgress - 1];

  const updateAnswerAndRedirect = async (formData: FormData) => {
    'use server';
    try {
      await updateAnswers(formData);
      redirect(`/profile/questionnaire/${parsedAnswerId}/${parsedCurrentProgress + 1}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form className="flex flex-col p-8 min-h-screen-w-header w-full justify-between items-center" action={updateAnswerAndRedirect}>
      <Typography variant="h1">Vstupní dotázník</Typography>
      <div className="relative w-full max-w-md flex items-center">
        <QuestionsGroup>
          {questionGroupToRender ? (
            questionGroupToRender.map((question, questionIndex) => <Question question={question} key={questionIndex} />)
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <Typography variant="h2">Děkuji za vyplnění dotazníku</Typography>
              <Link href="/profile">Vrátit se zpět na profil</Link>
            </div>
          )}
        </QuestionsGroup>
      </div>
      <NavigationAndProgress
        answer_id={parsedAnswerId}
        currentPage={parsedCurrentProgress}
        currentMaxProgress={answerProgress}
        totalQuestions={total_questions}
        isLastPage={!questionGroupToRender}
      />
      <input type="hidden" name="answer_id" value={answer_id} />
      <input type="hidden" name="user_id" value={user?.user_id} />
      <input type="hidden" name="current_progress" value={parsedCurrentProgress} />
    </form>
  );
};

export default Questionnaire;
