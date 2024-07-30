import { getAllUsersSubscriptions } from '@/db/userSubscription/getUserSubscription';
import UserSummary from './userSummary';

const UsersSummary = async () => {
  const users = await getAllUsersSubscriptions();

  return (
    <div className="flex flex-wrap gap-8">
      {users.map((user_subscription) => (
        <UserSummary key={`user-${user_subscription.user_id}`} user_subscription={user_subscription} />
      ))}
    </div>
  );
};

export default UsersSummary;
