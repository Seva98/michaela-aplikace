'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { getButtonColorStyle } from '@/utils/colors';
import { StarIcon } from '@radix-ui/react-icons';
import { MouseEvent, useState } from 'react';

const Rating = ({ color, user_subscription_id, defaultRating }: { color: string; user_subscription_id: number; defaultRating?: number }) => {
  const [rating, setRating] = useState(defaultRating ?? 4);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleRating = (e: MouseEvent<HTMLButtonElement>, i: number) => {
    e.preventDefault();
    setRating(i);
  };

  const handleMouseEnter = (i: number) => {
    setHoverIndex(i);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <>
      <div className="relative grid grid-cols-10 gap-1 w-fit mx-auto" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div className={cn('relative')} key={`box-${user_subscription_id}-${i}`}>
            <Button
              className={cn(
                'h-6 w-6 p-0 rounded flex justify-center items-center transition-opacity',
                i <= (hoverIndex !== null ? hoverIndex : rating) ? 'opacity-100' : 'opacity-10',
              )}
              onClick={(e) => handleRating(e, i)}
              onMouseEnter={() => handleMouseEnter(i)}
              style={getButtonColorStyle(color)}
            >
              <StarIcon color="white" />
            </Button>
          </div>
        ))}
      </div>
      <input type="hidden" name="rating" defaultValue={rating} />
    </>
  );
};

export default Rating;
