import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import { getSubscriptionSession, getUserSubscriptionSession } from '@/utils/db/subscriptions/getSubscriptionSession';
import SubscriptionHistoryBox from './subscriptionSessionBox';
import { auth0 } from '@/utils/auth0';
import { isAdmin } from '@/utils/roles';
import { getSubscriptionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';

const SubscriptionHistory = async ({
  subscription_sessions,
  number_of_sessions,
  is_completed,
  size = 'large',
  color,
}: {
  subscription_sessions: SubscriptionSession[];
  number_of_sessions: number;
  is_completed: boolean;
  size?: 'small' | 'large';
  color: string;
}) => {
  const session = await auth0.getSession();

  return (
    <div className="grid grid-cols-[repeat(5,auto)] mx-auto gap-1 justify-start ">
      {Array.from({ length: number_of_sessions }, (_, i) => (
        <SubscriptionHistoryBox
          key={`session-${i}`}
          // To limit client side data
          session={isAdmin(session) ? getSubscriptionSession(subscription_sessions, i) : getUserSubscriptionSession(subscription_sessions, i)}
          state={getSubscriptionHistoryState(subscription_sessions, i, is_completed)}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

export default SubscriptionHistory;
