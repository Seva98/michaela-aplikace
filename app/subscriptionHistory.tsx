import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import { getSubscriptionSession, getUserSubscriptionSession } from '@/utils/db/subscriptions/getSubscriptionSession';
import SubscriptionHistoryBox from './subscriptionSessionBox';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';
import { getSubscriptionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { unstable_noStore } from 'next/cache';

const SubscriptionHistory = async ({
  subscription_sessions,
  number_of_sessions,
  user_subscription_id,
  is_completed,
  size = 'large',
  color,
}: {
  subscription_sessions: SubscriptionSession[];
  number_of_sessions: number;
  user_subscription_id: number;
  is_completed: boolean;
  size?: 'small' | 'large';
  color: string;
}) => {
  unstable_noStore();
  const session = await getSession();

  return (
    <div className="grid grid-cols-[repeat(5,auto)] mx-auto gap-1 justify-start ">
      {Array.from({ length: number_of_sessions }, (_, i) => (
        <SubscriptionHistoryBox
          key={`session-${i}`}
          // To limit client side data
          session={isAdmin(session) ? getSubscriptionSession(subscription_sessions, i) : getUserSubscriptionSession(subscription_sessions, i)}
          user_subscription_id={user_subscription_id}
          state={getSubscriptionHistoryState(subscription_sessions, i, is_completed)}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

export default SubscriptionHistory;
