'use client';

import { useState } from 'react';
import { Question } from '@/app/profile/questionnaire/configuration';
import { addPageToQuestionnaire, updateQuestionnaire } from '@/db/questionnaires/updateQuestionnaire';
import { Button } from '@/components/ui/button';
import FormSubmitButton from '@/components/common/formSubmitButton';
import EditQuestion from './editQuestion';

import DeleteQuestionnaireQuestion from './deleteQuestionnaireQuestion';
import Typography from '@/components/ui/typography';
import FormWithError from '@/components/common/formWithError';

const EditCurrentConfiguration = ({ questionnaireQuestions, questionnaire_id }: { questionnaireQuestions: Question[][]; questionnaire_id: string }) => {
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

    const newGroupedQuestions = [...questionnaireQuestions];
    const draggedItem = newGroupedQuestions[dragging.groupIndex][dragging.questionIndex];

    newGroupedQuestions[dragging.groupIndex].splice(dragging.questionIndex, 1);
    newGroupedQuestions[groupIndex].splice(questionIndex, 0, draggedItem);

    updateQuestionnaire(parseInt(questionnaire_id), newGroupedQuestions);

    setDragging(null);
    setDragOver(null);
  };

  const onDragLeave = () => {
    setDragOver(null);
  };

  const onDropEmpty = (e: React.DragEvent<HTMLDivElement>, groupIndex: number) => {
    e.preventDefault();
    if (dragging === null) return;

    const newGroupedQuestions = [...questionnaireQuestions];
    const draggedItem = newGroupedQuestions[dragging.groupIndex][dragging.questionIndex];

    newGroupedQuestions[dragging.groupIndex].splice(dragging.questionIndex, 1);
    newGroupedQuestions[groupIndex].push(draggedItem);

    updateQuestionnaire(parseInt(questionnaire_id), newGroupedQuestions);

    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="flex flex-col gap-1">
      {questionnaireQuestions.map((questions, groupIndex) => (
        <div className=" w-full mb-4" key={`question-group-preview-${groupIndex}`}>
          <div className="font-semibold mb-1">Strana č.{groupIndex + 1}</div>
          {questions.map((question, questionIndex) => (
            <div className="flex gap-4" key={`question-preview-${groupIndex}-${questionIndex}`}>
              <div
                className={`flex gap-2 p-2 items-center max-w-md w-full hover:cursor-grab ${
                  dragOver?.groupIndex === groupIndex && dragOver?.questionIndex === questionIndex ? 'bg-stone-100 opacity-50' : 'bg-white'
                }`}
                draggable
                onDragStart={() => onDragStart(groupIndex, questionIndex)}
                onDragOver={(e) => onDragOver(e, groupIndex, questionIndex)}
                onDrop={(e) => onDrop(e, groupIndex, questionIndex)}
                onDragLeave={onDragLeave}
              >
                <div className="flex gap-2 items-center ">
                  <div className="text-lg pb-1">☰</div>
                  <Typography variant="small" className="w-[80px]">
                    Otázka č.{questionIndex + 1}
                  </Typography>
                  <EditQuestion
                    question={question}
                    question_id={questionIndex}
                    group_id={groupIndex}
                    variant="edit"
                    questionnaire_id={parseInt(questionnaire_id)}
                    key={`question-dialog-${groupIndex}-${questionIndex}`}
                  >
                    <div>{question.text}</div>
                  </EditQuestion>
                </div>
              </div>
              <DeleteQuestionnaireQuestion groupIndex={groupIndex} questionIndex={questionIndex} questionnaire_id={parseInt(questionnaire_id)} />
            </div>
          ))}
          <div className="flex gap-4 items-center">
            <div
              className="p-2 border-2 border-dashed border-gray-300 text-center w-full max-w-md text-gray-400 select-none"
              onDragOver={(e) => onDragOver(e, groupIndex, 0)}
              onDrop={(e) => onDropEmpty(e, groupIndex)}
              onDragLeave={onDragLeave}
            >
              Přetáhni sem otázku
            </div>
            <EditQuestion group_id={groupIndex} variant="create" questionnaire_id={parseInt(questionnaire_id)}>
              <Button>Nová otázka </Button>
            </EditQuestion>
          </div>
        </div>
      ))}
      <FormWithError action={addPageToQuestionnaire} className="max-w-md">
        <input type="hidden" name="questionnaire_id" value={questionnaire_id} />
        <FormSubmitButton className="w-full">Nová strana</FormSubmitButton>
      </FormWithError>
    </div>
  );
};

export default EditCurrentConfiguration;
