import Typography from '@/components/ui/typography';
import SubscriptionHistory from '../../trainer/subscriptionHistory';
import { czechDate, remainingDays } from '@/utils/dates';
import { auth0 } from '@/utils/auth0';
import { getUserByEmail } from '@/db/users/getUsers';
import { getUserSubscriptions } from '@/db/advanced/userSubscription/getUserSubscription';

import ActiveSubscriptionDetail from './activeSubscriptionDetail';

const ActiveSubscription = async () => {
  const session = await auth0.getSession();
  const user = await getUserByEmail(session?.user.email);

  if (!user) return null;

  const { user_id } = user;
  const subscritption = await getUserSubscriptions(user_id);

  const { active_subscription } = subscritption;

  return (
    <div className="flex flex-col shadow border rounded p-4 border-gray-100">
      <div className="flex justify-between">
        <Typography variant="h3">Členství - {active_subscription?.subscription_name}</Typography>
        <Typography variant="h4">
          Využito {active_subscription?.subscription_sessions.length} z {active_subscription?.number_of_sessions} tréninků
        </Typography>
      </div>
      {active_subscription ? <ActiveSubscriptionDetail active_subscription={active_subscription} /> : <Typography>Nemáš žádné aktivní členství</Typography>}
    </div>
  );
};

export default ActiveSubscription;