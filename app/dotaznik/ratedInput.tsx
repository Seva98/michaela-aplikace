'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { StarIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const RatedInput = ({ label, name }: { label: string; name: string }) => {
  const [rating, setRating] = useState(4);

  return (
    <form>
      <Typography variant="h3" className="text-center mb-4">
        {label}
      </Typography>
      <div className="flex justify-center items-center gap-2">
        <Typography>Žádné problémy</Typography>
        <div className="relative flex gap-1 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className={cn('relative')} key={`box-${name}-${i}`}>
              <Button
                variant={'outline'}
                className={cn('h-12 w-12 p-0 rounded flex justify-center items-center transition-opacity')}
                onClick={(e) => setRating(i)}
              >
                {i}
              </Button>
            </div>
          ))}
        </div>
        <Typography>Závažné problémy</Typography>
      </div>
      <input type="hidden" name={name} value={rating} />
    </form>
  );
};

export default RatedInput;
