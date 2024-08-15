'use client';

import { HTMLProps, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Textarea } from '../ui/textarea';

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
      {...props}
    />
  );
};

export default GrowingTextarea;
