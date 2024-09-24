'use client';

import { Question } from '@/app/dotaznik/configuration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const SingleChoiceQuestionConfiguration = ({ question }: { question?: Question }) => {
  const [encodedAnswers, setEncodedAnswers] = useState<string>(question && question.answers ? question.answers.join('__') : '');
  const [answers, setAnswers] = useState<string[]>(question && question.answers ? question.answers.map((s) => s.trim()).filter((s) => s) : []);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="flex flex-col ">
      <Label className={cn('text-md  font-semibold text-muted-foreground mb-[2px]')}>Odpovědi</Label>
      <Typography variant="small" className="text-gray-700 text-sm mb-1">
        Oddělit dvěmi podtržítky
      </Typography>
      <Input
        onChange={(e) => {
          setAnswers(
            e.target.value
              .split('__')
              .map((s) => s.trim())
              .filter((s) => s),
          );
          setEncodedAnswers(e.target.value);
        }}
        value={encodedAnswers}
      />
      <div className="flex flex-wrap gap-3 mt-2">
        {answers.map((answer, i) => (
          <div className="flex gap-1 items-center" key={`answer-${i}`}>
            <div className="h-10 w-10 p-0 rounded flex justify-center items-center transition-opacity border">{alphabet[i]}</div>
            <Typography>{answer}</Typography>
          </div>
        ))}
      </div>
      <input type="hidden" name="answers" value={JSON.stringify(answers)} />
    </div>
  );
};
export default SingleChoiceQuestionConfiguration;
