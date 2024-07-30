import Typography from '@/components/ui/typography';
import { ActivatedSubscription } from '@/db/userSubscription/userSubscription';
import { czechDate, isExpired } from '@/utils/dates';
import AddSession from './addSession';
import SubscriptionHistory from './subscriptionHistory';
import DeleteButton from '@/components/common/deleteButton';

const ActiveSubscription = ({
  subscription: { subscription_name, expiration_date, number_of_sessions, subscription_sessions, user_subscription_id },
  color,
}: {
  subscription: ActivatedSubscription;
  color: string;
}) => {
  return (
    <div className="flex flex-col justify-between h-full gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Typography>{subscription_name}</Typography>
          <DeleteButton />
        </div>
        <Typography variant={isExpired(expiration_date) ? 'error' : 'muted'}>
          {expiration_date ? `${isExpired(expiration_date) ? 'Expirovalo' : 'Expiruje'} ${czechDate(expiration_date)}` : 'Bez expirace'}
        </Typography>
        <div className="grid grid-cols-5 w-full gap-1 ">
          <SubscriptionHistory number_of_sessions={number_of_sessions} subscription_sessions={subscription_sessions} color={color} />
        </div>
      </div>
      <hr />
      <AddSession user_subscription_id={user_subscription_id} color={color} />
    </div>
  );
};

export default ActiveSubscription;
