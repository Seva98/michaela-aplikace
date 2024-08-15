import Typography from '@/components/ui/typography';
import SubscriptionHistory from '../subscriptionHistory';
import { czechDate, remainingDays } from '@/utils/dates';
import { getSession } from '@auth0/nextjs-auth0';
import { getUserByEmail } from '@/db/users/getUsers';
import { getUserSubscriptions } from '@/db/userSubscription/getUserSubscription';
import { unstable_noStore } from 'next/cache';

const ActiveSubscription = async () => {
  unstable_noStore();
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);

  if (!user) return null;

  const { user_id } = user;
  const subscritption = await getUserSubscriptions(user_id);

  const { active_subscription } = subscritption;

  return (
    <div className="flex flex-col shadow border rounded p-4 border-gray-100 w-fit">
      <Typography variant="h3">Aktivní členství</Typography>
      {active_subscription ? (
        <div className="flex flex-col gap-1">
          <Typography>{active_subscription.subscription_name}</Typography>
          <Typography>Platné od {czechDate(active_subscription.start_date)}</Typography>
          <Typography>Platné do {czechDate(active_subscription.expiration_date)}</Typography>
          <Typography>Zbývá {remainingDays(active_subscription.expiration_date)} dní</Typography>
          <SubscriptionHistory
            subscription_sessions={active_subscription.subscription_sessions}
            number_of_sessions={active_subscription?.number_of_sessions}
            is_completed={active_subscription.is_completed}
            color="#000"
          />
        </div>
      ) : (
        <Typography>Nemáš žádné aktivní členství</Typography>
      )}
    </div>
  );
};

export default ActiveSubscription;
