'use client';

import { RiDeleteBin6Line } from 'react-icons/ri';
import FormSubmitButton from './formSubmitButton';
import { cn } from '@/utils/cn';
import { ButtonSize } from '../ui/button';

const Delete = ({
  action,
  id,
  idKey,
  variant = 'button',
  className,
  size = 'default',
}: {
  action: (formData: FormData) => void;
  id: number;
  idKey: string;
  variant?: 'icon' | 'button';
  className?: string;
  size?: ButtonSize;
}) => {
  const handleDelete = (formData: FormData) => {
    if (confirm('Smazáním dojde k odstranění veškerých dat. Opravdu chceš pokračovat?')) {
      action(formData);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name={idKey} value={id} />
      <FormSubmitButton type="submit" variant={'destructive'} className={cn(className)} size={size}>
        {variant === 'button' ? 'Smazat' : <RiDeleteBin6Line />}
      </FormSubmitButton>
    </form>
  );
};

export default Delete;
