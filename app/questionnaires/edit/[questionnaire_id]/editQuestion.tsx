'use client';

import { Question, QuestionType } from '@/app/dotaznik/configuration';
import FormSubmitButton from '@/components/common/formSubmitButton';
import GrowingTextarea, { LabeledGrowingTextarea } from '@/components/common/growingTextarea';
import { FormContent } from '@/components/containers/content';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LabeledInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { addQuestionToQuestionnaire } from '@/db/answers/createAnswers';
import { unstable_noStore } from 'next/cache';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import SingleChoiceQuestionConfiguration from './singleChoiceQuestionConfiguration';

const EditQuestion = ({
  action,
  variant,
  questionnaire_id,
  group_id,
  onQuestionChange,
  children,
}: {
  action: (formData: FormData) => void;
  variant: 'create' | 'edit';
  questionnaire_id: number;
  group_id?: number;
  onQuestionChange?: (question: Question) => void;
  children: ReactNode;
}) => {
  unstable_noStore();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const [type, setType] = useState<QuestionType>(QuestionType.INFO);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [required, setRequired] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (variant === 'create') {
        addQuestionToQuestionnaire(formData);
      } else {
        // editQuestionInQuestinnaire(formData)
      }
      setOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
      setError((error as Error).message);
    }
    setPending(false);
  };

  useEffect(() => {
    onQuestionChange?.({
      text,
      description,
      placeholder,
      required,
      disabled,
      type,
    });
  }, [text, description, placeholder, required, disabled, type, onQuestionChange]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{variant === 'create' ? 'Nová otázky' : 'Upravit otázky'}</DialogTitle>
        </DialogHeader>
        <FormContent className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Typography variant="h3">{variant === 'create' ? 'Nová otázka' : 'Upravit Otázku'}</Typography>
          <Label htmlFor="type">Typ otázky</Label>
          <Select name="type" value={type} onValueChange={(t) => setType(t as QuestionType)}>
            <SelectTrigger>
              <SelectValue placeholder="Typ otázky" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuestionType.INFO}>Info</SelectItem>
              <SelectItem value={QuestionType.TEXT}>Text</SelectItem>
              <SelectItem value={QuestionType.TEXTAREA}>Dlouhý text</SelectItem>
              <SelectItem value={QuestionType.NUMBER}>Číslo</SelectItem>
              <SelectItem value={QuestionType.EMAIL}>Email</SelectItem>
              <SelectItem value={QuestionType.DATE}>Datum</SelectItem>
              <SelectItem value={QuestionType.SINGLECHOICE}>Jedna možnost</SelectItem>
              <SelectItem value={QuestionType.RATING}>Hodnocení</SelectItem>
            </SelectContent>
          </Select>
          {type === QuestionType.INFO ? (
            <GrowingTextarea
              label="Text"
              name="text"
              rows={6}
              placeholder="Text otázky"
              value={text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            />
          ) : (
            <LabeledInput label="Titulek otázky" name="text" placeholder="Nadpis otázky" value={text} onChange={(e) => setText(e.target.value)} />
          )}
          {type === QuestionType.SINGLECHOICE && <SingleChoiceQuestionConfiguration />}
          {type !== QuestionType.INFO && (
            <LabeledGrowingTextarea
              label="Popis otázky"
              name="description"
              placeholder="Delší popis otázky"
              rows={6}
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
          )}

          {type !== QuestionType.INFO && (
            <LabeledInput
              label="Nápověda"
              name="placeholder"
              placeholder="Nápověda vypada takto"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          )}
          <div className="flex justify-evenly  gap-2">
            {type !== QuestionType.INFO && (
              <Button type="button" className="w-full" variant={required ? 'default' : 'outline'} onClick={() => setRequired(!required)}>
                {required ? 'Povinná' : 'Nepovinná'} otázka
              </Button>
            )}
            <input type="text" value={`${required ? 'true' : ''}`} className="hidden" name="required" readOnly />
            {type !== QuestionType.INFO && (
              <Button type="button" className="w-full" variant={disabled ? 'outline' : 'default'} onClick={() => setDisabled(!disabled)}>
                {disabled ? 'Nepovolená' : 'Povolená'} otázka
              </Button>
            )}
            <input type="text" value={`${disabled ? 'true' : ''}`} className="hidden" name="disabled" readOnly />
          </div>
          <FormSubmitButton>{variant === 'create' ? 'Přidat' : 'Uložit'} otázku</FormSubmitButton>
          <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
          {group_id !== undefined && <input type="hidden" name="group_id" value={group_id} />}
        </FormContent>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestion;
