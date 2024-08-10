'use client';

import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { cn } from '@/utils/cn';

const Note = ({ note, className }: { note?: string; className?: string }) => {
  const [value, setValue] = useState(note);
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
    setValue(note); // Sync state with prop
    adjustHeight(); // Adjust height based on the initial note prop
  }, [note]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '36px'; // Reset height
    }
  }, []);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      className={cn('resize-none overflow-hidden', className)}
      onChange={(e) => {
        setValue(e.target.value);
        adjustHeight(); // Adjust height as the user types
      }}
      rows={1}
      name="note"
      style={{ minHeight: '2em' }}
    />
  );
};

export default Note;
