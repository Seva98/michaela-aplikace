import Typography from '@/components/ui/typography';
import { czechDate, remainingDays } from '@/utils/dates';
import { ActivatedSubscription } from '@/db/advanced/userSubscription/userSubscription';
import SubscriptionHistoryTable from './subscriptionHistoryTable';
import { SubscriptionExpired } from '@/utils/db/subscriptions/geSubscritionStatus';

const getExpiredColor = (active_subscription: ActivatedSubscription) =>
  remainingDays(active_subscription.expiration_date) === SubscriptionExpired.EXPIRED ? 'text-red-500' : 'text-current';

const ActiveSubscriptionDetail = ({ active_subscription }: { active_subscription: ActivatedSubscription }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1.5">
        <Typography>Platné od {czechDate(active_subscription.start_date)} do</Typography>
        <Typography className={getExpiredColor(active_subscription)}>{czechDate(active_subscription.expiration_date)}</Typography>
        <Typography className={getExpiredColor(active_subscription)}>- {remainingDays(active_subscription.expiration_date)}</Typography>
      </div>
      <hr className="mb-4" />
      <SubscriptionHistoryTable
        subscription_sessions={active_subscription.subscription_sessions}
        number_of_sessions={active_subscription?.number_of_sessions}
        is_completed={active_subscription.is_completed}
        isExpired={remainingDays(active_subscription.expiration_date) === SubscriptionExpired.EXPIRED}
        color="#000"
      />
    </div>
  );
};

export default ActiveSubscriptionDetail;
