'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { LabeledInput } from '../ui/input';
import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Loader from '../common/loader';
import Typography from '../ui/typography';
import Rating from '../rating/rating';
import { LabeledGrowingTextarea } from '../common/growingTextarea';
import { Label } from '../ui/label';
import { updateSessionWithUserSubscriptionId } from '@/db/sessions/updateSession';
import { CalendarSession } from '@/db/calendarSessions/calendarSession';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserSubscriptionDetail } from '@/db/advanced/userSubscriptionWithDetail/userSubscriptionDetail';
import { getName } from '@/utils/db/user/getName';
import { createSession } from '@/db/sessions/createSession';
import FormWithError from '../common/formWithError';

const EditCalendarSessionDialog = ({
  object,
  action,
  open,
  setOpen,
  userSubscriptionDetails,
  defaultIsoDate,
}: {
  object?: CalendarSession;
  children?: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  action: 'create' | 'edit';
  userSubscriptionDetails: UserSubscriptionDetail[];
  defaultIsoDate?: string;
}) => {
  const { session_id, user_subscription_id, session_date, note, rating } = object || { session_date: defaultIsoDate };
  const [selectedUserSubscriptionId, setSelectedUserSubscriptionId] = useState(`${user_subscription_id ?? -1}`);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (action === 'create') {
        await createSession(formData);
      } else {
        await updateSessionWithUserSubscriptionId(formData);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action === 'create' ? 'Nový trénink' : 'Upravit trénink'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormWithError action={() => {}} onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-lg">
          <Label htmlFor="user_subscription_id">Klienti s aktivním předplatným</Label>
          <Select name="user_subscription_id" defaultValue={selectedUserSubscriptionId} onValueChange={(id) => setSelectedUserSubscriptionId(id)}>
            <SelectTrigger>
              <SelectValue placeholder="Klient, předplatné" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">VOLNÝ TERMÍN</SelectItem>
              {userSubscriptionDetails.map(
                ({ user_subscription_id, first_name, last_name, subscription_name, used_sessions, total_sessions, is_fully_booked }) => (
                  <SelectItem key={`sub-${user_subscription_id}`} value={`${user_subscription_id}`} disabled={is_fully_booked}>
                    {getName(first_name, last_name)} - {subscription_name} ({used_sessions}/{total_sessions})
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <input type="hidden" name="session_id" value={session_id} />
          <input type="hidden" name="user_subscription_id" value={selectedUserSubscriptionId} />
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
            {pending ? <Loader /> : action === 'create' ? 'Vytvořit trénink' : 'Uložit změny'}
          </Button>
          {error && <Typography variant="error">{error}</Typography>}
        </FormWithError>
      </DialogContent>
    </Dialog>
  );
};

export default EditCalendarSessionDialog;
