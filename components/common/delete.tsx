'use client';

import FormSubmitButton from './formSubmitButton';

const Delete = ({ action, id, idKey }: { action: (formData: FormData) => void; id: number; idKey: string }) => {
  const handleDelete = (formData: FormData) => {
    if (confirm('Smazáním dojde k odstranění veškerých dat. Opravdu chceš pokračovat?')) {
      action(formData);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name={idKey} value={id} />
      <FormSubmitButton type="submit" variant={'destructive'}>
        Smazat
      </FormSubmitButton>
    </form>
  );
};

export default Delete;
