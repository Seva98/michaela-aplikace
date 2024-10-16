import { QuestionType } from '@/app/profile/questionnaire/configuration';
import { LabeledInput } from '@/components/ui/input';

const QuestionDescription = ({
  type,
  description,
  onDescriptionChange,
}: {
  type: QuestionType;
  description: string;
  onDescriptionChange: (description: string) => void;
}) => {
  return (
    type !== QuestionType.INFO && (
      <LabeledInput
        label="Popis otázky"
        name="description"
        placeholder="Delší popis otázky"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    )
  );
};

export default QuestionDescription;
