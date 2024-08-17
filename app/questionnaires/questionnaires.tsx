import { assignQuestionnaire, overwriteQuestionnaire } from '@/db/answers/createAnswers';
import { getAnswers } from '@/db/answers/getAnswers';
import { getQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import { getAllUsers } from '@/db/users/getUsers';
import { unstable_noStore } from 'next/cache';
import SelectUser from './selectUser';
import { getName } from '@/utils/db/user/getName';
import FormWithError from '@/components/common/formWithError';
import FormSubmitButton from '@/components/common/formSubmitButton';
import { deleteAnswers } from '@/db/answers/deleteAnswers';
import { updateQuestionnaire } from '@/db/questionnaires/updateQuestionnaire';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import Delete from '@/components/common/delete';
import { deleteQuestionnaire } from '@/db/questionnaires/deleteQuestionnaire';

const Questionnaires = async () => {
  unstable_noStore();

  const questionnaires = await getQuestionnaires();
  const answers = await getAnswers();
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-8">
      <FormWithError action={updateQuestionnaire}>
        <input type="hidden" name="name" value="Testovací dotazník" />
        <FormSubmitButton>Obnovit dotazníky</FormSubmitButton>
      </FormWithError>
      {questionnaires.map(({ questionnaire_id, name }) => (
        <div key={`questionnaire-${questionnaire_id}`} className="shadow-lg w-fit  border border-gray-100 p-4 flex flex-col gap-4">
          <div className="grid grid-cols-[600px_200px] gap-4 items-center">
            <FormWithError action={overwriteQuestionnaire} key={questionnaire_id} className="grid grid-cols-3 gap-4 items-center">
              <Link
                href={`
                /questionnaires/edit/${questionnaire_id}
                `}
              >
                <Typography variant="h6">{name}</Typography>
              </Link>
              <SelectUser users={users} />
              <FormSubmitButton>Přiřadit dotazník</FormSubmitButton>
              <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
            </FormWithError>
            <Delete action={deleteQuestionnaire} id={questionnaire_id} idKey="questionnaire_id" className="w-full" />
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            {answers.map(({ answer_id, user_id, answer }) => (
              <div key={answer_id} className="grid w-[600px] grid-cols-3 items-center gap-4">
                <div>{getName(users.find((u) => u.user_id === user_id)?.first_name ?? '', users.find((u) => u.user_id === user_id)?.last_name ?? '')}</div>
                <Link href={`/questionnaires/answer/${answer_id}`}>
                  <Button variant="outline" className="w-full">
                    Odpovědi
                  </Button>
                </Link>
                <form action={deleteAnswers}>
                  <input type="hidden" name="answer_id" value={answer_id} />
                  <input type="hidden" name="user_id" value={user_id} />
                  <FormSubmitButton className="w-full" type="submit" variant={'destructive'}>
                    Odstranit přiřazení
                  </FormSubmitButton>
                </form>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questionnaires;
