'use client';

import { RiDeleteBin6Line } from 'react-icons/ri';
import FormSubmitButton from './formSubmitButton';

const Delete = ({
  action,
  id,
  idKey,
  variant = 'button',
}: {
  action: (formData: FormData) => void;
  id: number;
  idKey: string;
  variant?: 'icon' | 'button';
}) => {
  const handleDelete = (formData: FormData) => {
    if (confirm('Smazáním dojde k odstranění veškerých dat. Opravdu chceš pokračovat?')) {
      action(formData);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name={idKey} value={id} />
      <FormSubmitButton type="submit" variant={'destructive'}>
        {variant === 'button' ? 'Smazat' : <RiDeleteBin6Line />}
      </FormSubmitButton>
    </form>
  );
};

export default Delete;
