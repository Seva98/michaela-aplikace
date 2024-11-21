import { QuestionType } from '@/app/user/profile/questionnaire/configuration';
import { Button } from '@/components/ui/button';

const QuestionRequiredDisabled = ({
  type,
  required,
  disabled,
  onRequiredChange,
  onDisabledChange,
}: {
  type: QuestionType;
  required: boolean;
  disabled: boolean;
  onRequiredChange: (required: boolean) => void;
  onDisabledChange: (disabled: boolean) => void;
}) => {
  return (
    <div className="flex justify-evenly  gap-2">
      {type !== QuestionType.INFO && (
        <Button type="button" className="w-full" variant={required ? 'default' : 'outline'} onClick={() => onRequiredChange(!required)}>
          {required ? 'Povinná' : 'Nepovinná'} otázka
        </Button>
      )}
      <input type="text" value={`${required ? 'true' : ''}`} className="hidden" name="required" readOnly />
      {type !== QuestionType.INFO && (
        <Button type="button" className="w-full" variant={disabled ? 'outline' : 'default'} onClick={() => onDisabledChange(!disabled)}>
          {disabled ? 'Nepovolená' : 'Povolená'} otázka
        </Button>
      )}
      <input type="text" value={`${disabled ? 'true' : ''}`} className="hidden" name="disabled" readOnly />
    </div>
  );
};

export default QuestionRequiredDisabled;
