import Typography from '@/components/ui/typography';
import { UserSubscription } from '@/db/userSubscription/userSubscription';
import { isSubscriptionCompleted } from '@/utils/data/subscriptions/isSubscriptionCompleted';
import { TriangleRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import ActiveSubscription from './activeSubscription';
import AddSubscription from './addSubscription';
import { getSubscriptions } from '@/db/subscriptions/getSubscriptions';

const Booking = async ({
  user_subscription: { user_id, name, active_subscription, color },
  isDetail = false,
}: {
  user_subscription: UserSubscription;
  isDetail?: boolean;
}) => {
  const subscriptions = await getSubscriptions();

  return (
    <div className="flex flex-col gap-2 shadow-lg  border border-gray-100 p-4 w-[292px]">
      {isDetail ? (
        <Typography variant="h3">Aktivní členství</Typography>
      ) : (
        <Link href={`/user/${user_id}`} className="flex justify-between items-center">
          <Typography variant="h3">{name}</Typography>
          <TriangleRightIcon className="w-6 h-6" />
        </Link>
      )}
      {active_subscription && !isSubscriptionCompleted(active_subscription) ? (
        <ActiveSubscription subscription={active_subscription} color={color} />
      ) : (
        <AddSubscription subscriptions={subscriptions} user_id={user_id} color={color} />
      )}
    </div>
  );
};

export default Booking;
