import { getLatestSubscriptionOfAllUsers } from '@/db/userSubscription/getUserSubscription';
import CurrentSubscription from './currentSubscription';

const UsersSummary = async () => {
  const users = await getLatestSubscriptionOfAllUsers();

  return (
    <div className="flex flex-wrap gap-4 sm:gap-8 justify-center lg:justify-start">
      {users.map((user_subscription) => (
        <CurrentSubscription key={`user-${user_subscription.user_id}`} user_subscription={user_subscription} />
      ))}
    </div>
  );
};

export default UsersSummary;
