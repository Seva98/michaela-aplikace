import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { getSubscriptionSession } from '@/utils/data/subscriptions/getSubscriptionSession';
import SubscriptionHistoryBox from './subscriptionSessionBox';

const SubscriptionHistory = ({
  subscription_sessions,
  number_of_sessions,
  size = 'large',
  color,
}: {
  subscription_sessions: SubscriptionSession[];
  number_of_sessions: number;
  size?: 'small' | 'large';
  color: string;
}) => {
  return (
    <div className="grid grid-cols-[repeat(5,auto)] w-full gap-1 justify-start">
      {Array.from({ length: number_of_sessions }, (_, i) => (
        <SubscriptionHistoryBox
          key={`session-${i}`}
          session={getSubscriptionSession(subscription_sessions, i)}
          subscription_sessions={subscription_sessions}
          index={i}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

export default SubscriptionHistory;
