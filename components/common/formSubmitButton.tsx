'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';
import Loader from './loader';

const FormSubmitButton = ({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}> &
  ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? <Loader /> : children}
    </Button>
  );
};

export default FormSubmitButton;
