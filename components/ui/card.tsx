import { cn } from '@/utils/cn';
import Typography from './typography';

type Props = {
  children: React.ReactNode;
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, title, className }: Props) => {
  return (
    <div className={cn('shadow-lg border border-gray-100 p-4', title ? 'flex flex-col gap-4' : '')}>
      {title && <Typography variant="h3">{title}</Typography>}
      <div className={cn(className)}>{children}</div>
    </div>
  );
};

export default Card;
