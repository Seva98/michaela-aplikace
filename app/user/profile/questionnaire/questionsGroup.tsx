import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const QuestionsGroup = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn('w-full transition-all duration-700 ease-in-out transform ')}>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default QuestionsGroup;
