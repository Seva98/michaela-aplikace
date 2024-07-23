import { cn } from '@/utils/cn';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'lead'
  | 'blockquote'
  | 'large'
  | 'small'
  | 'tiny'
  | 'muted'
  | 'error'
  | 'div'
  | 'success';

const Typography = ({
  children,
  variant,
  className,
}: Readonly<{
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}>) => {
  switch (variant) {
    case 'h1':
      return <h1 className={cn(`scroll-m-20 text-4xl font-extrabold lg:text-5xl`, className)}>{children}</h1>;
    case 'h2':
      return <h1 className={cn(`scroll-m-20 text-3xl font-extrabold lg:text-4xl`, className)}>{children}</h1>;
    case 'h3':
      return <h3 className={cn(`scroll-m-20 text-2xl font-semibold `, className)}>{children}</h3>;
    case 'h4':
      return <h4 className={cn(`scroll-m-20 text-xl font-semibold `, className)}>{children}</h4>;
    case 'h5':
      return <h5 className={cn(`scroll-m-20 text-lg font-semibold `, className)}>{children}</h5>;
    case 'h6':
      return <h6 className={cn(`scroll-m-20 text-md font-semibold `, className)}>{children}</h6>;
    case 'p':
      return <p className={cn(`text-base font-normal leading-relaxed [&:not(:first-child)]:mt-4 indent-1`, className)}>{children}</p>;
    case 'lead':
      return <p className={cn(`text-xl text-muted-foreground`, className)}>{children}</p>;
    case 'blockquote':
      return <blockquote className={cn(`mt-6 border-l-2 pl-6 italic`, className)}>{children}</blockquote>;
    case 'large':
      return <p className={cn(`text-lg font-semibold`, className)}>{children}</p>;
    case 'small':
      return <div className={cn(`text-sm font-medium leading-[1.1rem] text-pretty text-gray-700`, className)}>{children}</div>;
    case 'tiny':
      return <div className={cn(`text-xs font-medium leading-none`, className)}>{children}</div>;
    case 'muted':
      return <p className={cn(`text-sm text-muted-foreground`, className)}>{children}</p>;
    case 'error':
      return <div className={cn(`text-sm font-medium text-muted-foreground text-red-500 mt-1 leading-none`, className)}>{children}</div>;
    case 'success':
      return <div className={cn(`text-sm font-medium text-muted-foreground text-green-500 mt-1 leading-none`, className)}>{children}</div>;
    default:
      return <div className={className ?? ''}>{children}</div>;
  }
};

export default Typography;
