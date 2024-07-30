import Booking from '@/app/userSummary';
import Section from '@/components/containers/section';
import { getAllPastSubscriptionsOfUser, getUserSubscriptions } from '@/db/userSubscription/getUserSubscription';
import PreviousSubsriptions from './previousSubscriptions';
import { getUserById } from '@/db/users/getUsers';
import { ProfilePicture } from './profilePicture';
import ProfileDetails from './profileDetails';

const UserPage = async ({
  params: { user_id },
}: {
  params: {
    user_id: number;
  };
}) => {
  const user_subscription = await getUserSubscriptions(user_id);
  const subscriptions = await getAllPastSubscriptionsOfUser(user_id);
  const user = await getUserById(user_id);
  const { color, image } = user;

  return (
    <Section title="Detail klienta" linkBack sublink={{ href: '/users', label: 'Klienti' }}>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <ProfilePicture user_id={user_id} image={image} />
        <ProfileDetails user_id={user_id} />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <Booking user_subscription={user_subscription} isDetail />
        <PreviousSubsriptions subscriptions={subscriptions} color={color} />
      </div>
    </Section>
  );
};

export default UserPage;
