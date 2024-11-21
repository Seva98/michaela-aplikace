import SubscriptionHistory from '@/app/trainer/subscriptionHistory';
import DeleteButton from '@/components/common/deleteButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import { getUserById } from '@/db/users/getUsers';
import { deleteUserSubscription } from '@/db/advanced/userSubscription/deleteUserSubscription';
import { getAllPastSubscriptionsOfUser } from '@/db/advanced/userSubscription/getUserSubscription';
import { czechDate } from '@/utils/dates';

import { UserPageParams } from './page';
import Delete from '@/components/common/delete';

const PreviousSubsriptions = async ({ params }: UserPageParams) => {
  const { user_id } = await params;

  const subscriptions = await getAllPastSubscriptionsOfUser(user_id);
  const user = await getUserById(user_id);
  const { color } = user;

  return (
    <div className="shadow-lg border border-gray-100 p-4">
      <Typography variant="h3">Předchozí členství</Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Členství</TableHead>
            <TableHead>Platnost od</TableHead>
            <TableHead>Platnost do</TableHead>
            <TableHead>Ukončeno dne</TableHead>
            <TableHead>Vstupy</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map(
            ({
              user_subscription_id,
              subscription_name,
              start_date,
              expiration_date,
              completion_date,
              subscription_sessions,
              number_of_sessions,
              is_completed,
            }) => (
              <TableRow key={`user_subscription_id_${user_subscription_id}`}>
                <TableCell>{subscription_name}</TableCell>
                <TableCell>{czechDate(start_date)}</TableCell>
                <TableCell>{czechDate(expiration_date)}</TableCell>
                <TableCell>{czechDate(completion_date)}</TableCell>
                <TableCell>
                  <SubscriptionHistory
                    number_of_sessions={number_of_sessions}
                    subscription_sessions={subscription_sessions}
                    is_completed={is_completed}
                    color={color}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Delete action={deleteUserSubscription} idKey="user_subscription_id" id={user_subscription_id} />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviousSubsriptions;
