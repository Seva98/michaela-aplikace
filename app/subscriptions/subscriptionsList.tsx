import ChangeOrder from '@/components/common/changeOrder';
import ComponentWithError from '@/components/common/componentWithError';
import Delete from '@/components/common/delete';
import FormSubmitButton from '@/components/common/formSubmitButton';
import ToggleVisibility from '@/components/common/toggleVisibility';
import { Input, LabeledInput } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { deleteSubscription } from '@/db/subscriptions/deleteSubscription';
import { Subscription } from '@/db/subscriptions/subscription';
import { changeSubscriptionOrder, toggleSubscriptionVisibility, updateSubscription } from '@/db/subscriptions/updateSubscriptions';
import { cn } from '@/utils/cn';
import { unstable_noStore } from 'next/cache';

const SubscriptionsList = ({ subscriptions, gridClass }: { subscriptions: Subscription[]; gridClass: string }) => {
  unstable_noStore();

  return (
    <>
      {subscriptions.map(({ subscription_id, name, number_of_sessions, expiration_days, price_per_session, is_hidden }, i) => (
        <ComponentWithError key={`subscription-${subscription_id}`}>
          <div className={cn(gridClass)}>
            <ChangeOrder action={changeSubscriptionOrder} id={subscription_id} idKey="subscription_id" itemIndex={i} itemsLength={subscriptions.length} />
            <form action={updateSubscription} className="flex gap-2 items-end">
              <Input type="hidden" name="subscription_id" value={subscription_id} />
              <LabeledInput label="Název" type="text" name="name" defaultValue={name} />
              <LabeledInput label="Počet lekcí" type="number" name="number_of_sessions" defaultValue={number_of_sessions} />
              <LabeledInput label="Cena za lekci" type="number" name="price_per_session" defaultValue={price_per_session} />
              <LabeledInput label="Platnost (dní)" type="number" name="expiration_days" defaultValue={expiration_days} />
              <Typography>{number_of_sessions * price_per_session} Kč</Typography>
              <FormSubmitButton className="ms-auto">Uložit</FormSubmitButton>
            </form>
            <ToggleVisibility action={toggleSubscriptionVisibility} id={subscription_id} idKey="subscription_id" is_hidden={is_hidden} />
            <Delete action={deleteSubscription} id={subscription_id} idKey="subscription_id" />
          </div>
        </ComponentWithError>
      ))}
      <hr />
    </>
  );
};

export default SubscriptionsList;
