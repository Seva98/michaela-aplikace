import { getSession } from '@auth0/nextjs-auth0';
import Typography from '@/components/ui/typography';
import { getUserByEmail } from '@/db/users/getUsers';
import Section from '@/components/containers/section';
import { unstable_noStore } from 'next/cache';
import { getUserQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { czechDate } from '@/utils/dates';

const UserQuestionnaires = async () => {
  unstable_noStore();
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  const userQuestionnaires = await getUserQuestionnaires(user?.user_id);

  return (
    <div className="flex flex-col gap-4 shadow border rounded p-4 border-gray-100">
      <Typography variant="h3">Tvoje dotazníky</Typography>
      {userQuestionnaires ? (
        userQuestionnaires.map(({ name, current_progress, total_questions, questionnaire_id }, i) => (
          <div className="grid grid-cols-[20px_200px_200px_auto] items-center gap-4" key={`questionniare-${questionnaire_id}`}>
            <div>#{i + 1}</div>
            <div>{name}</div>
            <div>
              Odpovězeno {current_progress} z {total_questions} otázek
            </div>
            <Link href={`/dotaznik/${questionnaire_id}/${current_progress}`}>
              <Button>Přejít na dotazník</Button>
            </Link>
          </div>
        ))
      ) : (
        <Typography>Žádné přiřazené dotazníky</Typography>
      )}
    </div>
  );
};

export default UserQuestionnaires;
