import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const FullScreen = ({ children, className, ...props }: { children: ReactNode } & React.InputHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('min-h-screen-w-header', className)} {...props}>
      {children}
    </div>
  );
};

export default FullScreen;
