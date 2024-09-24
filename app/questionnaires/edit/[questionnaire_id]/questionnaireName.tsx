'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { updateQuestionnaireName } from '@/db/questionnaires/updateQuestionnaire';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { unstable_noStore } from 'next/cache';
import { useState } from 'react';

const QuestionnaireName = ({ name, questionnaire_id }: { name: string; questionnaire_id: string }) => {
  unstable_noStore();
  const [edit, setEdit] = useState(false);

  return (
    <form
      className="flex gap-2 items-center max-w-md justify-between"
      action={async (formData) => {
        await updateQuestionnaireName(formData);
        setEdit(false);
      }}
    >
      {edit ? (
        <>
          <Input type="text" name="name" defaultValue={name} />
          <FormSubmitButton>
            <CheckIcon />
          </FormSubmitButton>
        </>
      ) : (
        <>
          <Typography variant="h3">{name}</Typography>
          <Button type="button">
            <Pencil1Icon onClick={() => setEdit(true)} type="button" />
          </Button>
        </>
      )}
      <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
    </form>
  );
};

export default QuestionnaireName;
