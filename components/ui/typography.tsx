import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';

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
  | 'error-standard'
  | 'div'
  | 'success';

export type TypographyProps = Readonly<{
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>;

const Typography = ({ children, variant, className, ...props }: TypographyProps) => {
  switch (variant) {
    case 'h1':
      return (
        <h1 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-3xl font-bold`, className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-2xl font-bold`, className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-xl font-bold`, className)} {...props}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-lg font-bold`, className)} {...props}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-base font-bold`, className)} {...props}>
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 className={cn(`text-teal-600 tracking-tighter scroll-m-20 text-sm font-bold`, className)} {...props}>
          {children}
        </h6>
      );
    case 'p':
      return (
        <p className={cn(`text-base font-normal leading-relaxed [&:not(:first-child)]:mt-4 indent-1`, className)} {...props}>
          {children}
        </p>
      );
    case 'lead':
      return (
        <p className={cn(`text-xl text-muted-foreground`, className)} {...props}>
          {children}
        </p>
      );
    case 'blockquote':
      return (
        <blockquote className={cn(`mt-6 border-l-2 pl-6 italic`, className)} {...props}>
          {children}
        </blockquote>
      );
    case 'large':
      return (
        <p className={cn(`text-lg font-semibold`, className)} {...props}>
          {children}
        </p>
      );
    case 'small':
      return (
        <div className={cn(`text-sm font-medium leading-[1.1rem] text-pretty text-gray-700`, className)} {...props}>
          {children}
        </div>
      );
    case 'tiny':
      return (
        <div className={cn(`text-xs font-medium leading-none`, className)} {...props}>
          {children}
        </div>
      );
    case 'muted':
      return (
        <p className={cn(`text-sm text-muted-foreground`, className)} {...props}>
          {children}
        </p>
      );
    case 'error':
      return (
        <div className={cn(`text-sm font-medium text-muted-foreground text-red-500 mt-1 leading-none`, className)} {...props}>
          {children}
        </div>
      );
    case 'error-standard':
      return (
        <div className={cn(`font-medium text-muted-foreground text-red-500 mt-1 leading-none`, className)} {...props}>
          {children}
        </div>
      );
    case 'success':
      return (
        <div className={cn(`text-sm font-medium text-muted-foreground text-green-500 mt-1 leading-none`, className)} {...props}>
          {children}
        </div>
      );
    default:
      return (
        <div className={className ?? ''} {...props}>
          {children}
        </div>
      );
  }
};

export default Typography;
