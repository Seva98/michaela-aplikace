'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import Content, { FormContent } from '@/components/containers/content';
import { LabeledInput } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { createSubscription } from '@/db/subscriptions/createSubscription';
import { getTotal } from '@/utils/currency';
import { useState } from 'react';

const CreateSubscription = () => {
  const [sessions, setSessions] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <Content>
      <Typography variant="h2">Vytvoření nového členství</Typography>
      <FormContent action={createSubscription} className="flex flex-col max-w-lg">
        <LabeledInput label="Název" name="name" type="text" />
        <LabeledInput label="Počet vstupů" name="number_of_sessions" type="number" min={0} onChange={(e) => setSessions(parseInt(e.target.value))} />
        <LabeledInput label="Cena za vstup" name="price_per_session" type="number" min={0} onChange={(e) => setPrice(parseInt(e.target.value))} />
        <LabeledInput label="Expirace (počet dní)" name="number_of_sessions" type="number" min={0} />
        <Typography>Cena celkem: {getTotal(sessions, price)} Kč</Typography>
        <FormSubmitButton>Uložit</FormSubmitButton>
      </FormContent>
    </Content>
  );
};

export default CreateSubscription;
