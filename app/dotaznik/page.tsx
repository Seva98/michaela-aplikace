import { getSession } from '@auth0/nextjs-auth0';
import Typography from '@/components/ui/typography';
import { getUserByEmail } from '@/db/users/getUsers';
import Section from '@/components/containers/section';
import { unstable_noStore } from 'next/cache';
import { getUserQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import Link from 'next/link';

const QuestionnairePage = async () => {
  unstable_noStore();
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);

  const userQuestionnaires = await getUserQuestionnaires(user?.user_id);

  return (
    <Section title="Dostupné dotazníky">
      <div className="flex flex-col gap-4 shadow-lg w-fit  border border-gray-100 p-4">
        {userQuestionnaires ? (
          userQuestionnaires.map(({ name, questionnaire_id }) => (
            <Link key={`questionniare-${questionnaire_id}`} href={`/dotaznik/${questionnaire_id}`}>
              {name}
            </Link>
          ))
        ) : (
          <Typography>Žádné přiřazené dotazníky</Typography>
        )}
      </div>
    </Section>
  );
};

export default QuestionnairePage;
