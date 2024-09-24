import { QuestionType } from '@/app/dotaznik/configuration';
import GrowingTextarea from '@/components/common/growingTextarea';
import { LabeledInput } from '@/components/ui/input';
import { ChangeEvent } from 'react';

const QuestionText = ({ type, text, onTextChange }: { type: QuestionType; text: string; onTextChange: (text: string) => void }) => {
  return type === QuestionType.INFO ? (
    <GrowingTextarea
      label="Text"
      name="text"
      rows={6}
      placeholder="Text otázky"
      value={text}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)}
    />
  ) : (
    <LabeledInput label="Titulek otázky" name="text" placeholder="Nadpis otázky" value={text} onChange={(e) => onTextChange(e.target.value)} />
  );
};

export default QuestionText;
