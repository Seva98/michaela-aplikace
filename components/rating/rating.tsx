'use client';

import { getButtonColorStyle } from '@/utils/colors';
import { MouseEvent, useState } from 'react';
import RatingButton from './ratingButton';
import { Button } from '../ui/button';
import { ResetIcon } from '@radix-ui/react-icons';

const Rating = ({ color, user_subscription_id, defaultRating }: { color: string; user_subscription_id: number; defaultRating?: number }) => {
  const [rating, setRating] = useState(defaultRating ?? -1);
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
      <div className="grid grid-cols-12 gap-1 w-fit mx-auto" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`box-${user_subscription_id}-${i}`}>
            <RatingButton
              color={color}
              onClick={(e) => handleRating(e, i)}
              onMouseEnter={() => handleMouseEnter(i)}
              style={i <= (hoverIndex !== null ? hoverIndex : rating) ? getButtonColorStyle(color) : { background: '#ddd' }}
            />
          </div>
        ))}
        <div />
        <Button
          className="h-6 w-6 p-0 "
          type="button"
          onClick={() => setRating(-1)}
          onMouseEnter={() => setHoverIndex(-1)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <ResetIcon />
        </Button>
      </div>
      <input type="hidden" name="rating" defaultValue={rating} />
    </>
  );
};

export default Rating;
