import Section from '@/components/containers/section';
import { getUserSubscriptions } from '@/db/advanced/userSubscription/getUserSubscription';
import PreviousSubsriptions from './previousSubscriptions';
import { getUserById } from '@/db/users/getUsers';
import { ProfilePicture } from './profilePicture';
import ProfileDetails from './profileDetails';
import CurrentSubscription from '@/app/currentSubscription';
import { notFound } from 'next/navigation';

import CurrentSubscriptionDetail from './currentSubscriptionDetail';

export type UserPageParams = {
  params: Promise<{
    user_id: number;
  }>;
};

const UserPage = async ({ params }: UserPageParams) => {
  const { user_id } = await params;
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
      <CurrentSubscriptionDetail params={params} />
    </Section>
  );
};

export default UserPage;
