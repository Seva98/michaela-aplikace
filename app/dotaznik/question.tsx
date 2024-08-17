'use client';

import { QuestionType, Question as QuestionProp } from './configuration';
import { Label } from '@radix-ui/react-label';
import Typography from '@/components/ui/typography';
import GrowingTextarea, { LabeledGrowingTextarea } from '@/components/common/growingTextarea';
import RatedInput from './ratedInput';
import SingleChoice from './singleChoice';
import { cn } from '@/utils/cn';
import Markdown from '@/components/common/markdown';
import { useFormStatus } from 'react-dom';
import { LabeledInput } from '@/components/ui/input';

const Question = ({ question }: { question: QuestionProp }) => {
  const { type, name, text, description, required, answers, placeholder, disabled, value } = question;
  const { pending } = useFormStatus();

  switch (type) {
    case QuestionType.TEXT:
    case QuestionType.EMAIL:
    case QuestionType.NUMBER:
    case QuestionType.DATE:
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
    case QuestionType.TEXTAREA:
      return (
        <LabeledGrowingTextarea
          label={text}
          description={description}
          rows={6}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          disabled={pending}
          className="text-center"
        />
      );
    case QuestionType.INFO:
      return <Markdown content={text} />;
    case QuestionType.RATING:
      return <RatedInput name={name} label={text} value={value} disabled={pending} />;
    case QuestionType.SINGLECHOICE:
      return <SingleChoice answers={answers ?? []} name={name} value={value} label={text} disabled={pending} />;
    default:
      return null;
  }
};

export default Question;
