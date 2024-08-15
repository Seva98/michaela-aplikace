import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const QuestionsGroup = ({ children, index, currentPage }: { children: ReactNode; index: number; currentPage: number }) => {
  return (
    <div
      className={cn('absolute w-full transition-all duration-700 ease-in-out transform ', {
        'opacity-0 -translate-y-[40vh] pointer-events-none': index < currentPage,
        'opacity-0 translate-y-[40vh] pointer-events-none': index > currentPage,
      })}
    >
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default QuestionsGroup;
