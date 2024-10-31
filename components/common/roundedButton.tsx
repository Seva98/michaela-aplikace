import { cn } from '@/utils/cn';
import { Button } from '../ui/button';
import { HTMLAttributes, ReactNode } from 'react';

const RoundedButton = ({ children, className, active, ...props }: HTMLAttributes<HTMLButtonElement> & { children: ReactNode; active?: boolean }) => {
  return (
    <Button
      variant="outline"
      className={cn('rounded-full p-0 h-8 w-8 shadow-md border-gray-100 transition-transform', active ? 'rotate-45' : 'rotate-0', className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
