'use client';

import { HTMLProps, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import Typography from '../ui/typography';

const GrowingTextarea = ({ defaultValue, rows = 1, className, ...props }: { rows?: number; className?: string } & HTMLProps<HTMLTextAreaElement>) => {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to the scroll height
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  useEffect(() => {
    setValue(defaultValue); // Sync state with prop
    adjustHeight(); // Adjust height based on the initial note prop
  }, [defaultValue]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Set the initial height based on the number of rows passed or default to 1 row's height
      textarea.style.height = `${rows * 1.5}em`; // Assuming approximately 1.5em per row
    }
  }, [rows]);

  return (
    <Textarea
      ref={textareaRef}
      className={cn('resize-none overflow-hidden', className)}
      onChange={(e) => {
        setValue(e.target.value);
        adjustHeight(); // Adjust height as the user types
      }}
      rows={rows} // Use the rows prop
      style={{ minHeight: `calc(${rows * 1.5}em + 12px)` }} // Set the minimum height dynamically
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export default GrowingTextarea;

export const LabeledGrowingTextarea = ({
  label,
  description,
  className,
  isQuestionnaire = false,
  ...props
}: { label: string; description?: string; isQuestionnaire?: boolean } & Parameters<typeof GrowingTextarea>[0]) => (
  <div className={cn('flex flex-col', isQuestionnaire ? 'text-center' : '', className)}>
    {label && <Label className={cn(isQuestionnaire ? 'text-md font-semibold text-muted-foreground' : '', 'mb-1')}>{label}</Label>}
    {description && (
      <Typography variant="small" className="text-gray-700 text-sm mb-1">
        {description}
      </Typography>
    )}
    <GrowingTextarea rows={6} {...props} />
  </div>
);
