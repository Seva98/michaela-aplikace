import { QuestionType } from '@/app/profile/questionnaire/configuration';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SelectQuestionType = ({ type, onTypeChange }: { type: QuestionType; onTypeChange: (type: QuestionType) => void }) => {
  return (
    <Select name="type" value={type} onValueChange={onTypeChange}>
      <SelectTrigger>
        <SelectValue placeholder="Typ otázky" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={QuestionType.INFO}>Info</SelectItem>
        <SelectItem value={QuestionType.TEXT}>Text</SelectItem>
        <SelectItem value={QuestionType.TEXTAREA}>Dlouhý text</SelectItem>
        <SelectItem value={QuestionType.NUMBER}>Číslo</SelectItem>
        <SelectItem value={QuestionType.PHONE}>Telefon</SelectItem>
        <SelectItem value={QuestionType.EMAIL}>Email</SelectItem>
        <SelectItem value={QuestionType.DATE}>Datum</SelectItem>
        <SelectItem value={QuestionType.SINGLECHOICE}>Jedna možnost</SelectItem>
        <SelectItem value={QuestionType.RATING}>Hodnocení</SelectItem>
        <SelectItem value={QuestionType.SPECIAL}>Speciální</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectQuestionType;
