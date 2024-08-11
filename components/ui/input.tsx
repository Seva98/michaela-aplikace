import { cn } from '@/utils/cn';
import * as React from 'react';
import { Label } from './label';
import Typography from './typography';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export const LabeledInput = React.forwardRef<HTMLInputElement, InputProps & { label: string; description?: string }>(
  ({ label, description, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <Label className="text-sm text-muted-foreground" htmlFor={props.id}>
          {label}
        </Label>
        <Input {...props} ref={ref} />
        {description && (
          <Typography variant="small" className="text-gray-700">
            {description}
          </Typography>
        )}
      </div>
    );
  },
);
LabeledInput.displayName = 'LabeledInput';

export { Input };
