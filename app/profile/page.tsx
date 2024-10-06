import Section from '@/components/containers/section';
import Typography from '@/components/ui/typography';
import ProfilePicture from './profilePicture';
import { getSession } from '@auth0/nextjs-auth0';
import { getUserByEmail } from '@/db/users/getUsers';
import WelcomeMessage from './welcomeMessage';
import ActiveSubscription from './activeSubscription';
import PreviousSubscriptions from './previousSubscriptions';
import UserQuestionnaires from './userQuestionnaires';

const ProfilePage = async () => {
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  if (!user) return 'Tvůj účet není aktivní, pro více informací kontaktuj Míšu';

  return (
    <Section className="relevant" title="Tvůj profil">
      <div className="flex flex-col gap-8">
        <WelcomeMessage />
        <UserQuestionnaires />
        {/* <div className="grid grid-cols-[auto_1fr] gap-8">
          <ProfilePicture />
          <ActiveSubscription />
        </div>
        <div className="shadow border rounded p-4 border-gray-100 overflow-auto">
          <Typography variant="h3">Tvoje předchozí členství</Typography>
          <PreviousSubscriptions />
        </div> */}
      </div>
    </Section>
  );
};

export default ProfilePage;
