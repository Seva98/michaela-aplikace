import { getUserByEmail } from '@/db/users/getUsers';
import { getAllPastSubscriptionsOfUser } from '@/db/userSubscription/getUserSubscription';
import { getSession } from '@auth0/nextjs-auth0';
import SubscriptionHistory from '../subscriptionHistory';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { czechDate } from '@/utils/dates';
import { unstable_noStore } from 'next/cache';

const PreviousSubscriptions = async () => {
  unstable_noStore();
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);
  if (!user) return null;
  const { color, user_id } = user;

  const subscriptions = await getAllPastSubscriptionsOfUser(user_id);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Členství</TableHead>
          <TableHead>Platnost od</TableHead>
          <TableHead>Platnost do</TableHead>
          <TableHead>Vstupy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map(
          ({ user_subscription_id, subscription_name, start_date, expiration_date, subscription_sessions, number_of_sessions, is_completed }) => (
            <TableRow key={`user_subscription_id_${user_subscription_id}`}>
              <TableCell>{subscription_name}</TableCell>
              <TableCell>{czechDate(start_date)}</TableCell>
              <TableCell>{czechDate(expiration_date)}</TableCell>
              <TableCell>
                <SubscriptionHistory
                  is_completed={is_completed}
                  number_of_sessions={number_of_sessions}
                  subscription_sessions={subscription_sessions}
                  color={color}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default PreviousSubscriptions;
