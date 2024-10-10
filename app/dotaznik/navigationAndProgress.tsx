'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SelectPage from './selectPage';
import { unstable_noStore } from 'next/cache';

const NavigationAndProgress = ({
  currentPage,
  currentMaxProgress,
  questionnaire_id,
  totalQuestions,
  isLastPage,
}: {
  currentPage: number;
  currentMaxProgress: number;
  questionnaire_id: number;
  totalQuestions: number;
  isLastPage: boolean;
}) => {
  unstable_noStore();
  const router = useRouter();

  const handleNext = () => {
    if (currentPage < totalQuestions) {
      document.querySelector('form')?.requestSubmit();
    }
  };

  const handlePrevious = () => {
    router.push(`/dotaznik/${questionnaire_id}/${currentPage - 1 > 1 ? currentPage - 1 : 1}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      handleNext();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      handlePrevious();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="flex gap-4 justify-between w-full mt-8">
      <Button className="w-fit" variant="secondary" onClick={handlePrevious} disabled={currentPage <= 1} type="button">
        Zpět ⬆️
      </Button>
      <div className="text-center w-[200px]">
        <SelectPage currentPage={currentPage} currentMaxProgress={currentMaxProgress} questionnaire_id={questionnaire_id} totalQuestions={totalQuestions} />
      </div>
      {currentPage < totalQuestions + 1 ? (
        <FormSubmitButton className="w-fit" disabled={currentPage === totalQuestions + 1}>
          Další ⬇️
        </FormSubmitButton>
      ) : (
        <div />
      )}
    </div>
  );
};

export default NavigationAndProgress;
