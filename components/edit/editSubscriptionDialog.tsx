'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { LabeledInput } from '../ui/input';
import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Loader from '../common/loader';
import Typography from '../ui/typography';
import { Subscription } from '@/db/subscriptions/subscription';
import { createSubscription } from '@/db/subscriptions/createSubscription';
import { updateSubscription } from '@/db/subscriptions/updateSubscriptions';
import FormWithError from '../common/formWithError';

const EditSubscriptionDialog = ({
  action,
  object,
  children,
  defaultOpen = false,
}: {
  action: 'create' | 'edit';
  object?: Subscription;
  children?: ReactNode;
  defaultOpen?: boolean;
}) => {
  const { expiration_days, name, number_of_sessions, price_per_session, subscription_id } = object || {};
  const [open, setOpen] = useState(defaultOpen);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (action === 'create') {
        await createSubscription(formData);
      } else {
        await updateSubscription(formData);
      }
      setOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
      setError((error as Error).message);
    }
    setPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action === 'create' ? 'Nový typ členství' : 'Upravit členství'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormWithError action={() => {}} onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-lg">
          <input type="hidden" name="subscription_id" value={subscription_id} />
          <LabeledInput label="Název*" placeholder="Název" name="name" type="text" required defaultValue={name} />
          <LabeledInput
            label="Počet lekcí*"
            placeholder="Počet lekcí"
            name="number_of_sessions"
            type="number"
            min={1}
            required
            defaultValue={number_of_sessions}
          />
          <LabeledInput
            label="Cena za lekci*"
            placeholder="Cena za lekci"
            name="price_per_session"
            type="number"
            min={0}
            required
            defaultValue={price_per_session}
          />
          <LabeledInput
            label="Platnost (dní)*"
            placeholder="Platnost"
            name="expiration_days"
            type="number"
            min={0}
            required
            defaultValue={expiration_days}
            description="0 = bez expirace"
          />
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader /> : action === 'create' ? 'Vytvořit členství' : 'Uložit změny'}
          </Button>
          {error && <Typography variant="error">{error}</Typography>}
        </FormWithError>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionDialog;
