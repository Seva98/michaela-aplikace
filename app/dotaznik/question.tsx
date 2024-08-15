'use client';

import { Question as QuestionType } from './configuration';
import { Label } from '@radix-ui/react-label';
import Typography from '@/components/ui/typography';
import GrowingTextarea from '@/components/common/growingTextarea';
import RatedInput from './ratedInput';
import SingleChoice from './singleChoice';
import { cn } from '@/utils/cn';
import Markdown from '@/components/common/markdown';
import { useFormStatus } from 'react-dom';
import { LabeledInput } from '@/components/ui/input';

const Question = ({ question }: { question: QuestionType }) => {
  const { type, name, text, description, required, answers, placeholder, disabled, value } = question;
  const { pending } = useFormStatus();

  switch (type) {
    case 'text':
    case 'email':
    case 'number':
    case 'date':
      return (
        <LabeledInput
          name={name}
          label={text}
          type={type}
          description={description}
          required={required}
          disabled={disabled || pending}
          isQuestionnaire
          defaultValue={value}
        />
      );
    case 'textarea':
      return (
        <div className="flex flex-col  text-center">
          <Label className={cn('text-md  font-semibold text-muted-foreground', 'mb-1')}>{text}</Label>
          {description && (
            <Typography variant="small" className="text-gray-700 text-sm mb-1">
              {description}
            </Typography>
          )}
          <GrowingTextarea rows={6} placeholder={placeholder} name={name} defaultValue={value} disabled={pending} />
        </div>
      );
    case 'info':
      return <Markdown content={text} />;
    case 'rating':
      return <RatedInput name={name} label={text} value={value} disabled={pending} />;
    case 'singlechoice':
      return <SingleChoice answers={answers ?? []} name={name} value={value} label={text} disabled={pending} />;
    default:
      return null;
  }
};

export default Question;
