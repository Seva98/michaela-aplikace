import { cn } from '@/utils/cn';
import * as React from 'react';
import { Label } from './label';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };

export const LabeledTextarea = ({ label, ...props }: { label: string } & TextareaProps) => {
  return (
    <div className="flex flex-col">
      <Label className="text-sm text-muted-foreground" htmlFor={props.id}>
        {label}
      </Label>
      <Textarea {...props} />
    </div>
  );
};
