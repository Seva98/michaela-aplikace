import { cn } from '@/utils/cn';
import { HTMLProps } from 'react';

const Content = ({ children, className, ...props }: { children: React.ReactNode; className?: string } & HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  );
};

export default Content;

export const FormContent = ({ children, className, ...props }: { children: React.ReactNode; className?: string } & HTMLProps<HTMLFormElement>) => {
  return (
    <form className={cn('flex gap-2 ', className)} {...props}>
      {children}
    </form>
  );
};
