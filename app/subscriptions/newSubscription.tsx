'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import { LabeledInput } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { createSubscription } from '@/db/subscriptions/createSubscription';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const NewSubscription = ({ gridClass }: { gridClass: string }) => {
  const [numberOfSessions, setNumberOfSessions] = useState(0);
  const [pricePerSession, setPricePerSession] = useState(0);

  return (
    <>
      <Typography variant="h3">Nové člensví</Typography>
      <div className={cn(gridClass, 'items-end')}>
        <div />
        <form action={createSubscription} className="flex gap-2 items-end">
          <LabeledInput label="Název" placeholder="Název" name="name" type="text" required />
          <LabeledInput
            label="Počet lekcí"
            placeholder="Počet lekcí"
            name="number_of_sessions"
            type="number"
            min={1}
            required
            onChange={(e) => setNumberOfSessions(Number(e.target.value))}
          />
          <LabeledInput
            label="Cena za lekci"
            placeholder="Cena za lekci"
            name="price_per_session"
            type="number"
            min={0}
            required
            onChange={(e) => setPricePerSession(Number(e.target.value))}
          />
          <LabeledInput label="Platnost (dní)" placeholder="Platnost" name="expiration_days" type="number" min={0} required />
          <Typography>{numberOfSessions * pricePerSession} Kč</Typography>
          <FormSubmitButton>Přidat</FormSubmitButton>
        </form>
      </div>
    </>
  );
};

export default NewSubscription;
