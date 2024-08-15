'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const RatedInput = ({ label, name, value, disabled }: { label: string; name?: string; value?: string; disabled?: boolean }) => {
  const [rating, setRating] = useState(parseInt(value ?? ''));

  return (
    <div>
      <Typography className="text-center font-semibold mb-2">{label}</Typography>
      <div className="flex justify-center items-center gap-4">
        <Typography className="text-xs">Žádné problémy</Typography>
        <div className="relative flex gap-1 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className={cn('relative')} key={`box-${name}-${i}`}>
              <Button
                variant={rating === i ? 'default' : 'outline'}
                className={cn('h-10 w-10 p-0 rounded flex justify-center items-center transition-opacity')}
                onClick={(e) => setRating(i)}
                type="button"
                disabled={disabled}
              >
                {i}
              </Button>
            </div>
          ))}
        </div>
        <Typography className="text-xs">Závažné problémy</Typography>
      </div>
      <input type="hidden" name={name} value={rating} />
    </div>
  );
};

export default RatedInput;
