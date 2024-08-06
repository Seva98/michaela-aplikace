import Section from '@/components/containers/section';
import { getUserSubscriptions } from '@/db/userSubscription/getUserSubscription';
import PreviousSubsriptions from './previousSubscriptions';
import { getUserById } from '@/db/users/getUsers';
import { ProfilePicture } from './profilePicture';
import ProfileDetails from './profileDetails';
import CurrentSubscription from '@/app/currentSubscription';
import { notFound } from 'next/navigation';
import { unstable_noStore } from 'next/cache';

export type UserPageProps = {
  params: {
    user_id: number;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  unstable_noStore();
  const { user_id } = params;
  const user_subscription = await getUserSubscriptions(user_id);
  const user = await getUserById(user_id);
  if (!user) notFound();

  const { image } = user;

  return (
    <Section title="Detail klienta" linkBack sublink={{ href: '/users', label: 'Klienti' }}>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <ProfilePicture user_id={user_id} image={image} />
        <ProfileDetails params={params} />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <CurrentSubscription user_subscription={user_subscription} isDetail />
        <PreviousSubsriptions params={params} />
      </div>
    </Section>
  );
};

export default UserPage;
