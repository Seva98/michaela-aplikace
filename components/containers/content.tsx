import { cn } from '@/utils/cn';
import { HTMLProps } from 'react';

export const FormContent = ({ children, className, ...props }: { children: React.ReactNode; className?: string } & HTMLProps<HTMLFormElement>) => {
  return (
    <form className={cn('flex gap-2 ', className)} {...props}>
      {children}
    </form>
  );
};
