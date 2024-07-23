import { cn } from '@/utils/cn';

const Section = ({ children, className, ...props }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-8', className)} {...props}>
      {children}
    </div>
  );
};

export default Section;
