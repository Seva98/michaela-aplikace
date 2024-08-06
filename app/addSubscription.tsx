'use client';
import FormSubmitButton from '@/components/common/formSubmitButton';
import FormWithError from '@/components/common/formWithError';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { activateSubscription } from '@/db/subscriptions/activateSubscription';
import { Subscription } from '@/db/subscriptions/subscription';
import { today } from '@/utils/dates';
import Link from 'next/link';
import { useState } from 'react';

const AddSubscription = ({ subscriptions, user_id, color }: { subscriptions: Subscription[]; user_id: number; color: string }) => {
  const NO_SUBSCRIPTION = -1;
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptions.length > 0 ? subscriptions[0].subscription_id : NO_SUBSCRIPTION);

  if (selectedSubscription === NO_SUBSCRIPTION) {
    return <Link href="/subscriptions">Vytvořte nové členství</Link>;
  }

  return (
    <FormWithError action={(formData) => activateSubscription(formData, selectedSubscription)} className="flex flex-col gap-1">
      <Typography variant="h4">Aktivovat nové členství</Typography>
      <input type="hidden" name="user_id" value={user_id} />
      <Label htmlFor="start_date">Začátek členství</Label>
      <Input type="date" name="start_date" defaultValue={today()} />
      <Label htmlFor="subscription_id">Typ členství</Label>
      <Select
        name="subscription_id"
        defaultValue={subscriptions[0].name}
        onValueChange={(s) => setSelectedSubscription(subscriptions.find(({ name }) => name === s)?.subscription_id || subscriptions[0].subscription_id)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Klient" />
        </SelectTrigger>
        <SelectContent>
          {subscriptions.map(({ name, subscription_id }) => (
            <SelectItem key={`sub-${subscription_id}`} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormSubmitButton
        style={{
          backgroundColor: color,
        }}
      >
        Uložit
      </FormSubmitButton>
    </FormWithError>
  );
};

export default AddSubscription;
