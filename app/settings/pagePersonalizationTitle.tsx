import { LabeledInput } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';

const PagePersonalizationTitle = ({ title }: { title?: string }) => {
  return (
    <TableCell className="align-top">
      <LabeledInput label="Titulek" name="title" defaultValue={title} />
    </TableCell>
  );
};

export default PagePersonalizationTitle;
