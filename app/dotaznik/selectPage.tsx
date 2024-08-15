'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { unstable_noStore } from 'next/cache';
import { useRouter } from 'next/navigation';

const SelectPage = ({ questionnaire_id, currentPage, currentMaxProgress }: { questionnaire_id: number; currentPage: number; currentMaxProgress: number }) => {
  unstable_noStore();
  const router = useRouter();

  return (
    <Select
      value={`${currentPage - 1}`}
      onValueChange={(p) => {
        router.push(`/dotaznik/${questionnaire_id}/${parseInt(p) + 1}`);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={currentPage} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: currentMaxProgress + 1 }).map((_, p) => (
          <SelectItem key={`page-${p}`} value={`${p}`}>
            {p + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectPage;
