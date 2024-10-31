import ChangeOrder from '@/components/common/changeOrder';
import Delete from '@/components/common/delete';
import ToggleVisibility from '@/components/common/actionButton/toggleVisibility';
import Typography from '@/components/ui/typography';
import { deleteSubscription } from '@/db/subscriptions/deleteSubscription';
import { Subscription } from '@/db/subscriptions/subscription';
import { changeSubscriptionOrder, toggleSubscriptionVisibility, updateSubscription } from '@/db/subscriptions/updateSubscriptions';

import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableRowWithError from '@/components/common/error/tableRowWithError';
import { Button } from '@/components/ui/button';
import EditSubscriptionDialog from '@/components/edit/EditSubscriptionDialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import CommonActionsTableCell from '@/components/common/actionButton/commonActionsTableCell';

const SubscriptionsList = ({ subscriptions }: { subscriptions: Subscription[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pořadí</TableHead>
          <TableHead>Název</TableHead>
          <TableHead>Počet lekcí</TableHead>
          <TableHead>Cena za lekci</TableHead>
          <TableHead>Platnost (dní)</TableHead>
          <TableHead>Cena celkem</TableHead>
          <TableHead>Akce</TableHead>
        </TableRow>
        {subscriptions.map(({ subscription_id, name, number_of_sessions, expiration_days, price_per_session, is_hidden }, i) => (
          <TableRowWithError key={`subscription-${subscription_id}`}>
            <TableCell className="w-24">
              <ChangeOrder
                action={changeSubscriptionOrder}
                id={subscription_id}
                idKey="subscription_id"
                itemIndex={i}
                itemsLength={subscriptions.length}
                size="xs"
              />
            </TableCell>
            <TableCell>
              <Typography>{name}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{number_of_sessions}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{price_per_session} Kč</Typography>
            </TableCell>
            <TableCell>
              <Typography>{expiration_days === 0 ? 'Bez expirace' : expiration_days}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{number_of_sessions * price_per_session} Kč</Typography>
            </TableCell>
            <CommonActionsTableCell
              object={subscriptions[i]}
              EditComponent={EditSubscriptionDialog}
              toggleVisibilityAction={toggleSubscriptionVisibility}
              id={subscription_id}
              id_key={`subscription_id`}
              is_hidden={is_hidden}
              deleteAction={deleteSubscription}
              size="xs"
            />
          </TableRowWithError>
        ))}
      </TableHeader>
    </Table>
  );
};

export default SubscriptionsList;
