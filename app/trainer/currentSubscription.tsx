import Typography from '@/components/ui/typography';
import { UserSubscription } from '@/db/advanced/userSubscription/userSubscription';
import { hasRemainingSessions, isSubscriptionActive } from '@/utils/db/subscriptions/geSubscritionStatus';
import { TriangleRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import ActiveSubscription from './activeSubscription';
import AddSubscription from './addSubscription';
import { getSubscriptions } from '@/db/subscriptions/getSubscriptions';

const CurrentSubscription = async ({
  user_subscription: { user_id, name, active_subscription, color },
  isDetail = false,
}: {
  user_subscription: UserSubscription;
  isDetail?: boolean;
}) => {
  const subscriptions = await getSubscriptions();

  return (
    <div className="flex flex-col flex-grow gap-2 shadow-lg  border border-gray-100 p-4 min-w-[280px] max-w-[350px] basis-[280px] w-full">
      {isDetail ? (
        <Typography variant="h3">Aktivní členství</Typography>
      ) : (
        <Link href={`/trainer/users/${user_id}`} className="flex justify-between items-center">
          <Typography variant="h3">{name}</Typography>
          <TriangleRightIcon className="w-6 h-6" />
        </Link>
      )}
      {active_subscription && <ActiveSubscription subscription={active_subscription} color={color} />}
      {!isSubscriptionActive(active_subscription) && <AddSubscription subscriptions={subscriptions} user_id={user_id} color={color} />}
      {isSubscriptionActive(active_subscription) && !hasRemainingSessions(active_subscription) && (
        <Typography variant="small" className="mb-auto">
          Před aktivaci nového členství nejprve ukonči současné členství 👆🏼
        </Typography>
      )}
    </div>
  );
};

export default CurrentSubscription;
