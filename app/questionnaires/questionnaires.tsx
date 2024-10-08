import { assignQuestionnaireToUser } from '@/db/answers/createAnswers';
import { getAnswers } from '@/db/answers/getAnswers';
import { getQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import { getAllUsers } from '@/db/users/getUsers';
import { unstable_noStore } from 'next/cache';
import SelectUser from './selectUser';
import { getName } from '@/utils/db/user/getName';
import FormWithError from '@/components/common/formWithError';
import FormSubmitButton from '@/components/common/formSubmitButton';
import { deleteAnswers } from '@/db/answers/deleteAnswers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import Delete from '@/components/common/delete';
import { deleteQuestionnaire } from '@/db/questionnaires/deleteQuestionnaire';
import { czechDate, czechDateWithTime } from '@/utils/dates';
import { cn } from '@/utils/cn';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Questionnaires = async ({ gridClass }: { gridClass: string }) => {
  unstable_noStore();

  const questionnaires = await getQuestionnaires();
  const answers = await getAnswers();
  const users = await getAllUsers();

  return (
    <>
      {questionnaires.map(({ questionnaire_id, name }) => (
        <div key={`questionnaire-${questionnaire_id}`} className="flex flex-col gap-4 shadow-lg border border-gray-100 p-4">
          <div className="flex justify-between items-center gap-4">
            <Link
              href={`
                /questionnaires/edit/${questionnaire_id}
                `}
            >
              <Typography variant="h4">{name}</Typography>
            </Link>
            <Delete action={deleteQuestionnaire} id={questionnaire_id} idKey="questionnaire_id" variant="icon" className="w-full" />
          </div>
          <hr />
          <div className={'flex flex-col gap-2'}>
            {answers
              .filter((a) => a.questionnaire_id === questionnaire_id)
              .map(({ answer_id, user_id, current_progress, total_questions, last_updated }) => (
                <div key={answer_id} className={cn('justify-between gap-4', gridClass)}>
                  <div>{getName(users.find((u) => u.user_id === user_id)?.first_name ?? '', users.find((u) => u.user_id === user_id)?.last_name ?? '')}</div>
                  <div>
                    Odpovězeno {current_progress} / {total_questions}
                  </div>
                  <div>{czechDateWithTime(last_updated.toISOString())}</div>
                  <div className="flex justify-end gap-2">
                    <Link href={`/questionnaires/answer/${answer_id}`} className="w-28">
                      <Button variant="outline" className="w-full">
                        Odpovědi
                      </Button>
                    </Link>
                    <form action={deleteAnswers}>
                      <input type="hidden" name="answer_id" value={answer_id} />
                      <input type="hidden" name="user_id" value={user_id} />
                      <FormSubmitButton type="submit" variant={'destructive'}>
                        <RiDeleteBin6Line />
                      </FormSubmitButton>
                    </form>
                  </div>
                </div>
              ))}
            <FormWithError action={assignQuestionnaireToUser} key={questionnaire_id} className="flex gap-4 justify-between">
              <SelectUser users={users} />
              <FormSubmitButton>Přiřadit dotazník</FormSubmitButton>
              <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
            </FormWithError>
          </div>
        </div>
      ))}
    </>
  );
};

export default Questionnaires;
