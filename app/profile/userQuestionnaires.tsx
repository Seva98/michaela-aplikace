import { getSession } from '@auth0/nextjs-auth0';
import Typography from '@/components/ui/typography';
import { getUserByEmail } from '@/db/users/getUsers';
import { unstable_noStore } from 'next/cache';
import { getUserQuestionnaires } from '@/db/questionnaires/getQuestionnaire';
import Link from 'next/link';
import Card from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const getQuestionnaireLink = (answer_id: number, current_progress: number, total_questions: number) => {
  const isFirst = current_progress === 1;
  const isLast = current_progress === total_questions;
  const page = isFirst ? 1 : isLast ? total_questions + 1 : current_progress + 1;
  return `/dotaznik/${answer_id}/${page}`;
};

const UserQuestionnaires = async () => {
  unstable_noStore();
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  const userQuestionnaires = await getUserQuestionnaires(user?.user_id);

  return (
    <Card title="Tvoje dotazníky">
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead>#</TableHead>
              <TableHead>Název</TableHead>
              <TableHead>Progres</TableHead>
              <TableHead>Odkaz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userQuestionnaires.map(({ answer_id, name, current_progress, total_questions }, index) => (
              <TableRow key={`questionniare-${answer_id}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  {current_progress} z {total_questions} otázek
                </TableCell>
                <TableCell>
                  <Link href={getQuestionnaireLink(answer_id, current_progress, total_questions)}>Otevřít dotazník</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="block lg:hidden space-y-4">
        {userQuestionnaires.map(({ name, current_progress, total_questions, questionnaire_id }, index) => (
          <Card key={`questionniare-mobile-${questionnaire_id}`}>
            <div className="flex flex-col space-y-2">
              <Typography variant="h4">
                #{index + 1} {name}
              </Typography>
              <div className="flex justify-between text-sm">
                <Typography>
                  Odpovězeno {current_progress} z {total_questions} otázek
                </Typography>
                <Link className="" href={getQuestionnaireLink(questionnaire_id, current_progress, total_questions)}>
                  Otevřít dotazník
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default UserQuestionnaires;
