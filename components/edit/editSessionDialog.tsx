'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FormContent } from '../containers/content';
import { LabeledInput } from '../ui/input';
import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Loader from '../common/loader';
import Typography from '../ui/typography';
import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import Rating from '../form/rating';
import { LabeledGrowingTextarea } from '../common/growingTextarea';
import { Label } from '../ui/label';
import { updateSession } from '@/db/sessions/updateSession';

const EditSessionDialog = ({ object, children, defaultOpen = false }: { object?: SubscriptionSession; children?: ReactNode; defaultOpen?: boolean }) => {
  const { session_id, session_date, note, rating } = object || {};
  const [open, setOpen] = useState(defaultOpen);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      await updateSession(formData);
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
          <DialogTitle>{'Upravit trénink'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormContent onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-lg">
          <input type="hidden" name="session_id" value={session_id} />
          <LabeledInput label="Datum" type="datetime-local" name="session_date" defaultValue={session_date?.slice(0, 19)} className="flex-none" />
          <LabeledGrowingTextarea
            label="Poznámka k tréninku"
            placeholder="Poznámka k tréninku"
            name="note"
            className="min-h-[5rem] h-full"
            defaultValue={note}
            rows={7}
          />
          <Label className="text-sm text-muted-foreground">Hodnocení</Label>
          <Rating color="black" defaultRating={rating} user_subscription_id={-1} />
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader /> : 'Uložit změny'}
          </Button>
          {error && <Typography variant="error">{error}</Typography>}
        </FormContent>
      </DialogContent>
    </Dialog>
  );
};

export default EditSessionDialog;
