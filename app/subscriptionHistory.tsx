import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { getSubscriptionSession, getUserSubscriptionSession } from '@/utils/db/subscriptions/getSubscriptionSession';
import SubscriptionHistoryBox from './subscriptionSessionBox';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';

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
  const session = await getSession();

  return (
    <div className="grid grid-cols-[repeat(5,auto)] mx-auto gap-1 justify-start ">
      {Array.from({ length: number_of_sessions }, (_, i) => (
        <SubscriptionHistoryBox
          key={`session-${i}`}
          session={!isAdmin(session) ? getSubscriptionSession(subscription_sessions, i) : getUserSubscriptionSession(subscription_sessions, i)}
          subscription_sessions={subscription_sessions}
          is_completed={is_completed}
          index={i}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

export default SubscriptionHistory;
