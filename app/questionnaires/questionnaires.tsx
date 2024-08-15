import { assignQuestionnaire, overwriteQuestionnaire } from '@/db/answers/createAnswers';
import { getAnswers } from '@/db/answers/getAnswers';
import { getQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import { getAllUsers } from '@/db/users/getUsers';
import { unstable_noStore } from 'next/cache';
import SelectUser from './selectUser';
import { getName } from '@/utils/db/user/getName';
import FormWithError from '@/components/common/formWithError';
import FormSubmitButton from '@/components/common/formSubmitButton';
import Delete from '@/components/common/delete';
import { deleteAnswers } from '@/db/answers/deleteAnswers';
import { updateQuestionnaire } from '@/db/questionnaires/updateQuestionnaire';

const Questionnaires = async () => {
  unstable_noStore();

  const questionnaires = await getQuestionnaires();
  const answers = await getAnswers();
  const users = await getAllUsers();

  return (
    <div>
      <FormWithError action={updateQuestionnaire}>
        <input type="hidden" name="name" value="Testovací dotazník" />
        <FormSubmitButton>Obnovit dotazníky</FormSubmitButton>
      </FormWithError>
      {questionnaires.map(({ questionnaire_id, name }) => (
        <FormWithError action={overwriteQuestionnaire} key={questionnaire_id} className="flex flex-col gap-4">
          <div className="grid grid-cols-[200px_200px_200px] gap-4">
            <h2>{name}</h2>
            <SelectUser users={users} />
            <FormSubmitButton>Přiřadit dotazník</FormSubmitButton>
            <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
          </div>
        </FormWithError>
      ))}
      <div>
        {answers.map(({ answer_id, user_id, answer }) => (
          <div key={answer_id} className="grid grid-cols-[1fr_1fr_auto] gap-4">
            <div>{getName(users.find((u) => u.user_id === user_id)?.first_name ?? '', users.find((u) => u.user_id === user_id)?.last_name ?? '')}</div>
            <form action={deleteAnswers}>
              <input type="hidden" name="answer_id" value={answer_id} />
              <input type="hidden" name="user_id" value={user_id} />
              <FormSubmitButton type="submit" variant={'destructive'}>
                {'Smazat'}
              </FormSubmitButton>
            </form>
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaires;
