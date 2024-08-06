import SubscriptionHistory from '@/app/subscriptionHistory';
import DeleteButton from '@/components/common/deleteButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import { ActivatedSubscription } from '@/db/userSubscription/userSubscription';
import { czechDate } from '@/utils/dates';
import { unstable_noStore } from 'next/cache';

const PreviousSubsriptions = ({ subscriptions, color }: { subscriptions: ActivatedSubscription[]; color: string }) => {
  unstable_noStore();

  return (
    <div className="shadow-lg border border-gray-100 p-4">
      <Typography variant="h3">Předchozí členství</Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Členství</TableHead>
            <TableHead>Platnost od</TableHead>
            <TableHead>Platnost do</TableHead>
            <TableHead>Vstupy</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map(({ user_subscription_id, subscription_name, start_date, expiration_date, subscription_sessions, number_of_sessions }) => (
            <TableRow key={`user_subscription_id_${user_subscription_id}`}>
              <TableCell>{subscription_name}</TableCell>
              <TableCell>{czechDate(start_date)}</TableCell>
              <TableCell>{czechDate(expiration_date)}</TableCell>
              <TableCell>
                <SubscriptionHistory number_of_sessions={number_of_sessions} subscription_sessions={subscription_sessions} color={color} size="small" />
              </TableCell>
              <TableCell>
                <DeleteButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviousSubsriptions;
