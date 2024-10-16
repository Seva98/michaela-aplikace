'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { unstable_noStore } from 'next/cache';
import { useRouter } from 'next/navigation';

const SelectPage = ({
  answer_id,
  currentPage,
  currentMaxProgress,
  totalQuestions,
}: {
  answer_id: number;
  currentPage: number;
  currentMaxProgress: number;
  totalQuestions: number;
}) => {
  unstable_noStore();
  const router = useRouter();
  const reachedLastPage = currentPage > totalQuestions;

  console.log(currentPage, currentMaxProgress, reachedLastPage);

  return (
    <Typography className="grid grid-cols-[auto_auto_auto] gap-1 items-center">
      <div>Otázka</div>
      <Select
        value={reachedLastPage ? '' : `${currentPage}`}
        onValueChange={(p) => {
          router.push(`/profile/questionnaire/${answer_id}/${parseInt(p)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={reachedLastPage ? '' : currentPage} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: reachedLastPage ? totalQuestions : currentMaxProgress + 1 }).map((_, p) => (
            <SelectItem key={`page-${p}`} value={`${p + 1}`}>
              {p + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>z {totalQuestions}</div>
    </Typography>
  );
};

export default SelectPage;
