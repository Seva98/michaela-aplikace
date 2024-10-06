import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

enum Subtype {
  NAME = 'first_name',
  SURNAME = 'last_name',
  EMAIL = 'email',
  PHONE = 'phone',
  BIRTHDAY = 'birthday',
}
const options = [
  { value: Subtype.NAME, label: 'Jméno', type: 'text', disabled: true, required: false },
  { value: Subtype.SURNAME, label: 'Příjmení', type: 'text', disabled: true, required: false },
  { value: Subtype.EMAIL, label: 'Email', type: 'email', disabled: true, required: false },
  { value: Subtype.PHONE, label: 'Telefon', type: 'tel', disabled: false, required: true },
  { value: Subtype.BIRTHDAY, label: 'Datum narození', type: 'date', disabled: false, required: true },
];

const QuestionSpecial = () => {
  const [subtype, setSubtype] = useState(options[0].value);

  return (
    <>
      <Select name="type" value={subtype} onValueChange={(s) => setSubtype(s as Subtype)}>
        <SelectTrigger>
          <SelectValue placeholder="Typ otázky" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {}
      <input type="hidden" name="text" value={options.find((o) => o.value === subtype)?.label} />
      <input type="hidden" name="key" value={subtype} />
      <input type="hidden" name="type" value={options.find((o) => o.value === subtype)?.type} />
      <input type="text" value={`${options.find((o) => o.value === subtype)?.disabled ? 'true' : ''}`} className="hidden" name="disabled" readOnly />
      <input type="text" value={`${options.find((o) => o.value === subtype)?.required ? 'true' : ''}`} className="hidden" name="required" readOnly />
    </>
  );
};

export default QuestionSpecial;
