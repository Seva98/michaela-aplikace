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

  const requiredText = required ? `${text}*` : text;

  switch (type) {
    case QuestionType.TEXT:
    case QuestionType.EMAIL:
    case QuestionType.NUMBER:
    case QuestionType.PHONE:
    case QuestionType.DATE:
      return (
        <LabeledInput
          name={name}
          label={requiredText}
          type={type}
          description={description}
          required={required}
          disabled={disabled || pending}
          placeholder={placeholder}
          isQuestionnaire
          defaultValue={value}
        />
      );
    case QuestionType.TEXTAREA:
      return (
        <LabeledGrowingTextarea
          label={requiredText}
          description={description}
          rows={6}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          required={required}
          disabled={pending}
          className="text-center"
        />
      );
    case QuestionType.INFO:
      return <Markdown content={text} />;
    case QuestionType.RATING:
      return <RatedInput name={name} label={requiredText} value={value} disabled={pending} required={required} />;
    case QuestionType.SINGLECHOICE:
      return (
        <SingleChoice answers={answers ?? []} description={description} name={name} value={value} label={requiredText} disabled={pending} required={required} />
      );
    default:
      return null;
  }
};

export default Question;
