'use client';

import { Question, QuestionType } from '@/app/dotaznik/configuration';
import FormSubmitButton from '@/components/common/formSubmitButton';
import GrowingTextarea, { LabeledGrowingTextarea } from '@/components/common/growingTextarea';
import { FormContent } from '@/components/containers/content';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LabeledInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { unstable_noStore } from 'next/cache';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import SingleChoiceQuestionConfiguration from './singleChoiceQuestionConfiguration';
import { addQuestionToQuestionnaire, editQuestionInQuestionnaire } from '@/db/questionnaires/updateQuestionnaire';
import Loader from '@/components/common/loader';
import SelectQuestionType from './selectQuestionType';
import QuestionText from './questionText';
import QuestionDescription from './questionDescription';
import QuestionPlaceholder from './questionPlaceholder';
import QuestionRequiredDisabled from './questionRequiredDisabled';
import QuestionSpecial from './questionSpecial';

const EditQuestion = ({
  variant,
  question,
  questionnaire_id,
  group_id,
  question_id,
  children,
}: {
  variant: 'create' | 'edit';
  question?: Question;
  questionnaire_id: number;
  group_id?: number;
  question_id?: number;
  children: ReactNode;
}) => {
  console.log(question);
  unstable_noStore();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState<QuestionType>(question ? question.type : QuestionType.INFO);
  const [text, setText] = useState(question ? question.text : '');
  const [description, setDescription] = useState(question?.description ?? '');
  const [placeholder, setPlaceholder] = useState(question?.placeholder ?? '');
  const [required, setRequired] = useState(question?.required ?? true);
  const [disabled, setDisabled] = useState(question?.disabled ?? false);

  useEffect(() => {
    if (open) {
      if (variant === 'edit' && question) {
        setType(question.type);
        setText(question.text);
        setDescription(question?.description ?? '');
        setPlaceholder(question?.placeholder ?? '');
        setRequired(question?.required ?? true);
        setDisabled(question?.disabled ?? false);
      } else {
        setType(QuestionType.INFO);
        setText('');
        setDescription('');
        setPlaceholder('');
        setRequired(true);
        setDisabled(false);
      }
    }
  }, [open, variant, question]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (variant === 'create') {
        await addQuestionToQuestionnaire(formData);
      } else {
        await editQuestionInQuestionnaire(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError((error as Error).message);
      return;
    }
    // reset();
    setPending(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{variant === 'create' ? 'Nová otázka' : 'Upravit otázku'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormContent className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Label htmlFor="type">Typ otázky</Label>
          <SelectQuestionType type={type} onTypeChange={setType} />
          {type === QuestionType.SPECIAL ? (
            <QuestionSpecial />
          ) : (
            <>
              <QuestionText type={type} text={text} onTextChange={setText} />
              {type === QuestionType.SINGLECHOICE && <SingleChoiceQuestionConfiguration question={question} />}
              <QuestionDescription type={type} description={description} onDescriptionChange={setDescription} />
              <QuestionPlaceholder type={type} placeholder={placeholder} onPlaceholderChange={setPlaceholder} />
              <QuestionRequiredDisabled type={type} required={required} disabled={disabled} onRequiredChange={setRequired} onDisabledChange={setDisabled} />
            </>
          )}
          <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
          {question_id !== undefined && <input type="hidden" name="question_id" value={question_id} />}
          {group_id !== undefined && <input type="hidden" name="group_id" value={group_id} />}
          {error && <Typography variant="error">{error}</Typography>}
          <FormSubmitButton disabled={pending}>{pending ? <Loader /> : variant === 'create' ? 'Přidat otázku' : 'Uložit otázku'}</FormSubmitButton>
        </FormContent>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestion;
