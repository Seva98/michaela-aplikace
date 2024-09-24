import { QuestionType } from '@/app/dotaznik/configuration';
import { LabeledInput } from '@/components/ui/input';

const QuestionPlaceholder = ({
  type,
  placeholder,
  onPlaceholderChange,
}: {
  type: QuestionType;
  placeholder: string;
  onPlaceholderChange: (placeholder: string) => void;
}) => {
  return (
    type !== QuestionType.INFO && (
      <LabeledInput
        label="Nápověda"
        name="placeholder"
        placeholder="Nápověda vypada takto"
        value={placeholder}
        onChange={(e) => onPlaceholderChange(e.target.value)}
      />
    )
  );
};

export default QuestionPlaceholder;
