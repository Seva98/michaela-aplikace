import { cn } from '@/utils/cn';
import Typography from './typography';

type Props = {
  children: React.ReactNode;
  title?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, title, className, padding }: Props) => {
  const paddingClass = padding === 'none' ? 'p-0' : padding === 'small' ? 'p-2' : padding === 'medium' ? 'p-4' : 'p-8';
  const titleClass = title ? 'flex flex-col gap-4' : '';

  return (
    <div className={cn('shadow-lg border border-teal-800/10', paddingClass, titleClass)}>
      {title && <Typography variant="h3">{title}</Typography>}
      <div className={cn(className)}>{children}</div>
    </div>
  );
};

export default Card;
