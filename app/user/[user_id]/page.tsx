import Booking from '@/app/booking';
import Section from '@/components/containers/section';
import Typography from '@/components/ui/typography';
import { getAllPastSubscriptionsOfUser } from '@/db/userSubscription/getAllSubscriptionsOfUser';
import { getUserSubscriptions } from '@/db/userSubscription/getUserSubscription';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import PreviousSubsriptions from './previousSubscriptions';
import { getUserById } from '@/db/users/getUsers';
import { getName } from '@/utils/data/user/getName';
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
  const { first_name, last_name, image } = user;

  return (
    <Section>
      <div className="flex items-center gap-8">
        <Link href="/">
          <TriangleLeftIcon className="w-10 h-10" />
        </Link>
        <Typography variant="h1">Detail klienta</Typography>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <ProfilePicture user_id={user_id} image={image} />
        <ProfileDetails user_id={user_id} />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-8">
        <Booking user_subscription={user_subscription} isDetail />
        <PreviousSubsriptions subscriptions={subscriptions} />
      </div>
    </Section>
  );
};

export default UserPage;
