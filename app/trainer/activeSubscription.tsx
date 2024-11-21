import Typography from '@/components/ui/typography';
import { ActivatedSubscription } from '@/db/advanced/userSubscription/userSubscription';
import { czechDate, isExpired } from '@/utils/dates';
import AddSession from './addSession';
import SubscriptionHistory from './subscriptionHistory';
import SubscriptionState from './subscriptionState';
import { hasRemainingSessions } from '@/utils/db/subscriptions/geSubscritionStatus';

const ActiveSubscription = ({ subscription, color }: { subscription: ActivatedSubscription | null; color: string }) => {
  if (!subscription) return null;

  const { subscription_name, expiration_date, number_of_sessions, subscription_sessions, user_subscription_id, is_completed } = subscription;

  return (
    <div className="flex flex-col justify-between h-full gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Typography>{subscription_name}</Typography>
          <SubscriptionState is_completed={is_completed} user_subscription_id={user_subscription_id} color={color} />
        </div>
        <Typography variant={isExpired(expiration_date) ? 'error' : 'muted'}>
          {expiration_date ? `${isExpired(expiration_date) ? 'Expirovalo' : 'Expiruje'} ${czechDate(expiration_date)}` : 'Bez expirace'}
        </Typography>
        <SubscriptionHistory number_of_sessions={number_of_sessions} subscription_sessions={subscription_sessions} color={color} is_completed={is_completed} />
      </div>
      <hr />
      {hasRemainingSessions(subscription) && <AddSession user_subscription_id={user_subscription_id} color={color} />}
    </div>
  );
};

export default ActiveSubscription;
