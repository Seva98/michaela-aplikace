'use client';

import { QuestionType } from '@/app/dotaznik/configuration';
import FormSubmitButton from '@/components/common/formSubmitButton';
import GrowingTextarea, { LabeledGrowingTextarea } from '@/components/common/growingTextarea';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { useState } from 'react';

const EditConfiguration = ({
  action,
  variant,
  questionnaire_id,
}: {
  action: (formData: FormData) => void;
  variant: 'create' | 'edit';
  questionnaire_id: number;
}) => {
  const [required, setRequired] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <form className="flex flex-col gap-2" action={action}>
      <Typography variant="h3">{variant === 'create' ? 'Nová otázka' : 'Upravit Otázku'}</Typography>
      <Label htmlFor="type">Typ otázky</Label>
      <Select name="type" defaultValue={QuestionType.INFO}>
        <SelectTrigger>
          <SelectValue placeholder="Typ otázky" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={QuestionType.INFO}>Info</SelectItem>
          <SelectItem value={QuestionType.TEXT}>Text</SelectItem>
          <SelectItem value={QuestionType.TEXTAREA}>Dlouhý text</SelectItem>
          <SelectItem value={QuestionType.NUMBER}>Číslo</SelectItem>
          <SelectItem value={QuestionType.EMAIL}>Email</SelectItem>
          <SelectItem value={QuestionType.SINGLECHOICE}>Jedna možnost</SelectItem>
          <SelectItem value={QuestionType.RATING}>Hodnocení</SelectItem>
        </SelectContent>
      </Select>
      <LabeledInput label="Titulek otázky" name="text" placeholder="Nadpis otázky" />
      <LabeledGrowingTextarea label="Popis otázky" name="description" rows={2} placeholder="Delší popis otázky" />
      <LabeledInput label="Nápověda" name="placeholder" placeholder="Nápověda vypada takto" />
      <LabeledInput label="Skupina" name="group" placeholder="Otázky se stejnou skupinou jsou na 1 stránce" />
      <div className="flex justify-evenly  gap-2">
        <Button type="button" className="w-full" variant={required ? 'default' : 'outline'} onClick={() => setRequired(!required)}>
          {required ? 'Povinná' : 'Nepovinná'} otázka
        </Button>
        <input type="text" value={`${required ? 'true' : ''}`} className="hidden" name="required" readOnly />
        <Button type="button" className="w-full" variant={disabled ? 'outline' : 'default'} onClick={() => setDisabled(!disabled)}>
          {disabled ? 'Nepovolená' : 'Povolená'} otázka
        </Button>
        <input type="text" value={`${disabled ? 'true' : ''}`} className="hidden" name="disabled" readOnly />
      </div>
      <FormSubmitButton>{variant === 'create' ? 'Přidat' : 'Uložit'} otázku</FormSubmitButton>
      <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
    </form>
  );
};

export default EditConfiguration;
