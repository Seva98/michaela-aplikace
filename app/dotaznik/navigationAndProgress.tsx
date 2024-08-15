'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Progress } from '@radix-ui/react-progress';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SelectPage from './selectPage';
import { unstable_noStore } from 'next/cache';

const NavigationAndProgress = ({
  currentPage,
  currentMaxProgress,
  questionnaire_id,
  totalQuestions,
}: {
  currentPage: number;
  currentMaxProgress: number;
  questionnaire_id: number;
  totalQuestions: number;
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
  console.log(currentPage);

  return (
    <div className="flex gap-4 justify-between w-full mt-8">
      <Button className="w-fit" variant="secondary" onClick={handlePrevious} disabled={currentPage <= 1} type="button">
        Zpět ⬆️
      </Button>
      <div className="text-center">
        <Typography className="grid grid-cols-[auto_auto_auto] gap-1 items-center">
          <div>Otázka</div>
          <SelectPage currentPage={currentPage} currentMaxProgress={currentMaxProgress} questionnaire_id={questionnaire_id} />
          <div>z {totalQuestions}</div>
        </Typography>
        <Progress className="w-[200px]" value={currentPage + 1} max={totalQuestions} />
      </div>
      <FormSubmitButton className="w-fit" disabled={currentPage === totalQuestions}>
        Další ⬇️
      </FormSubmitButton>
    </div>
  );
};

export default NavigationAndProgress;
