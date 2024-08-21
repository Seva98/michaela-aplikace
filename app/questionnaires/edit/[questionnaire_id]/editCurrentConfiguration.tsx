'use client';

import { useState } from 'react';
import { groupQuestions, Question } from '@/app/dotaznik/configuration';
import { updateQuestionnaireOrder } from '@/db/questionnaires/updateQuestionnaire';
import { Button } from '@/components/ui/button';
import { addPageToQuestionnaire, addQuestionToQuestionnaire } from '@/db/answers/createAnswers';
import FormSubmitButton from '@/components/common/formSubmitButton';
import EditQuestion from './editQuestion';

const EditCurrentConfiguration = ({ questions, questionnaire_id }: { questions: Question[]; questionnaire_id: string }) => {
  const [groupedQuestions, setGroupedQuestions] = useState(groupQuestions(questions));
  const [dragging, setDragging] = useState<{ groupIndex: number; questionIndex: number } | null>(null);
  const [dragOver, setDragOver] = useState<{ groupIndex: number; questionIndex: number } | null>(null);

  const onDragStart = (groupIndex: number, questionIndex: number) => {
    setDragging({ groupIndex, questionIndex });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, groupIndex: number, questionIndex: number) => {
    e.preventDefault();
    setDragOver({ groupIndex, questionIndex });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, groupIndex: number, questionIndex: number) => {
    e.preventDefault();
    if (dragging === null) return;

    const newGroupedQuestions = [...groupedQuestions];
    const draggedItem = newGroupedQuestions[dragging.groupIndex][dragging.questionIndex];

    // Remove the dragged item from its original position
    newGroupedQuestions[dragging.groupIndex].splice(dragging.questionIndex, 1);

    // Add the dragged item to the new position
    newGroupedQuestions[groupIndex].splice(questionIndex, 0, draggedItem);

    updateQuestionnaireOrder(parseInt(questionnaire_id), dragging, { groupIndex, questionIndex });

    setGroupedQuestions(newGroupedQuestions);
    setDragging(null);
    setDragOver(null);
  };

  const onDragLeave = () => {
    setDragOver(null);
  };

  const onDropEmpty = (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => {
    e.preventDefault();
    if (dragging === null) return;

    const newGroupedQuestions = [...groupedQuestions];
    const draggedItem = newGroupedQuestions[dragging.groupIndex][dragging.questionIndex];

    // Remove the dragged item from its original position
    newGroupedQuestions[dragging.groupIndex].splice(dragging.questionIndex, 1);

    // Add the dragged item to the empty group
    newGroupedQuestions[groupIndex].push(draggedItem);

    setGroupedQuestions(newGroupedQuestions);
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="flex flex-col gap-1">
      {groupedQuestions.map((questions, groupIndex) => (
        <div className=" w-full mb-4" key={`question-group-preview-${groupIndex}`}>
          <div className="font-semibold mb-1">Strana č.{groupIndex + 1}</div>
          {questions.length === 0 && (
            <div className="flex gap-4 items-center">
              <div
                className="p-2 border-2 border-dashed border-gray-300 text-center w-full max-w-md "
                onDragOver={(e) => onDragOver(e, groupIndex, 0)}
                onDrop={(e) => onDropEmpty(e, groupIndex)}
                onDragLeave={onDragLeave}
              >
                Přetáhni sem otázku
              </div>
              <EditQuestion action={addQuestionToQuestionnaire} variant="create" questionnaire_id={parseInt(questionnaire_id)}>
                <Button>Nová otázka</Button>
              </EditQuestion>
            </div>
          )}
          {questions.map(({ text }, questionIndex) => (
            <div className="flex gap-4" key={`question-preview-${groupIndex}-${questionIndex}`}>
              <div
                className={`flex gap-2 p-2 w-full max-w-md hover:cursor-grab ${
                  dragOver?.groupIndex === groupIndex && dragOver?.questionIndex === questionIndex ? 'bg-stone-100 opacity-50' : 'bg-white'
                }`}
                draggable
                onDragStart={() => onDragStart(groupIndex, questionIndex)}
                onDragOver={(e) => onDragOver(e, groupIndex, questionIndex)}
                onDrop={(e) => onDrop(e, groupIndex, questionIndex)}
                onDragLeave={onDragLeave}
              >
                <div>☰ Otázka č.{questionIndex + 1}</div>
                <div>{text}</div>
              </div>
              {questionIndex === questions.length - 1 && <Button>Nová otázka</Button>}
            </div>
          ))}
        </div>
      ))}
      <form action={addPageToQuestionnaire} className="max-w-md">
        <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
        <FormSubmitButton className="w-full">Nová strana</FormSubmitButton>
      </form>
    </div>
  );
};

export default EditCurrentConfiguration;
