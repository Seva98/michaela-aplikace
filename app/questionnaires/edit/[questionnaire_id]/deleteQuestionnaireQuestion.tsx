import FormSubmitButton from '@/components/common/formSubmitButton';
import { deleteQuestionnaireQuestion } from '@/db/questionnaires/deleteQuestionnaire';
import { cn } from '@/utils/cn';
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeleteQuestionnaireQuestion = ({
  questionnaire_id,
  groupIndex,
  questionIndex,
  className,
}: {
  questionnaire_id: number;
  groupIndex: number;
  questionIndex: number;
  className?: string;
}) => {
  const handleDelete = (formData: FormData) => {
    if (confirm('Smazáním dojde k odstranění veškerých dat. Opravdu chceš pokračovat?')) {
      deleteQuestionnaireQuestion(formData);
    }
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name={'questionnaire_id'} value={questionnaire_id} />
      <input type="hidden" name={'groupIndex'} value={groupIndex} />
      <input type="hidden" name={'questionIndex'} value={questionIndex} />
      <FormSubmitButton type="submit" variant={'destructive'} className={cn(className)}>
        <RiDeleteBin6Line />
      </FormSubmitButton>
    </form>
  );
};

export default DeleteQuestionnaireQuestion;
