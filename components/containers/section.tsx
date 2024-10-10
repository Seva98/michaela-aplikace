import { cn } from '@/utils/cn';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Typography from '../ui/typography';

const Section = ({
  children,
  className,
  title,
  linkBack = false,
  sublink,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  sublink?: { href: string; label: string };
  linkBack?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col gap-8 m-2 sm:m-8', className)} {...props}>
      <div className="flex items-center gap-8">
        {linkBack && (
          <Link href="/">
            <TriangleLeftIcon className="w-10 h-10" />
          </Link>
        )}
        {sublink && (
          <>
            <Link href={sublink.href} className="flex items-center">
              <Typography variant="h3">{sublink.label}</Typography>
            </Link>
            <TriangleLeftIcon className="w-10 h-10" />
          </>
        )}
        <Typography variant="h1">{title}</Typography>
      </div>
      {children}
    </div>
  );
};

export default Section;
