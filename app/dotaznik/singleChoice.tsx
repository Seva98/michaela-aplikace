'use client';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const SingleChoice = ({
  label,
  name,
  answers,
  value,
  description,
  disabled,
}: {
  label: string;
  name?: string;
  answers: string[];
  value?: string;
  description?: string;
  disabled?: boolean;
}) => {
  const [answer, setAnswer] = useState(value ?? '');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div>
      <Typography className="text-center font-semibold mb-2">{label}</Typography>
      {description && (
        <Typography variant="small" className="text-gray-700 text-sm mb-1">
          {description}
        </Typography>
      )}
      <div className="relative flex flex-col gap-1">
        {answers.map((newAnswer, i) => (
          <div className="flex gap-2 items-center" key={`answer${label}-${i}`}>
            <Button
              variant={answer === newAnswer ? 'default' : 'outline'}
              className={cn('h-10 w-10 p-0 rounded flex justify-center items-center transition-opacity')}
              onClick={() => setAnswer(newAnswer)}
              type="button"
              disabled={disabled}
            >
              {alphabet[i]}
            </Button>
            <Typography>{newAnswer}</Typography>
          </div>
        ))}
      </div>
      <input type="hidden" name={name} value={answer} disabled={disabled} />
    </div>
  );
};

export default SingleChoice;
