'use client';

import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from './select';
import { ButtonSize, ButtonVariant, buttonVariants } from './button';
import { cn } from '@/utils/cn';

const SelectButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    options: { value: string; label: string }[];
    placeholder?: string;
    defaultValue?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onValueChange?: (value: string) => void;
  }
>(({ className, options, placeholder, defaultValue, variant = 'default', size = 'xs', onValueChange, ...props }, ref) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger ref={ref} className={cn(buttonVariants({ variant, size }), 'flex items-center justify-between gap-2 w-full', className)} {...props}>
        <SelectValue placeholder={placeholder || 'Select an option'} />
      </SelectTrigger>

      <SelectContent>
        <SelectPrimitive.Viewport className="bg-white rounded-md shadow-lg">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectPrimitive.Viewport>
      </SelectContent>
    </Select>
  );
});

SelectButton.displayName = 'SelectButton';

export { SelectButton };
