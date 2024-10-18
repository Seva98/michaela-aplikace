import EditSubscription from '@/components/edit/editSubscription';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { Pencil1Icon } from '@radix-ui/react-icons';
import ToggleVisibility from './toggleVisibility';
import Delete from '../delete';
import { FC, PropsWithChildren } from 'react';

const CommonActionsTableCell = ({
  object,
  EditComponent,
  toggleVisibilityAction,
  id,
  id_key,
  is_hidden,
  deleteAction,
}: {
  object: any;
  EditComponent: FC<PropsWithChildren<{ action: 'create' | 'edit'; object: any }>>;
  toggleVisibilityAction: (formData: FormData) => Promise<void>;
  id: number;
  id_key: string;
  is_hidden: boolean;
  deleteAction: (formData: FormData) => Promise<void>;
}) => {
  return (
    <TableCell className="flex space-x-2">
      <EditComponent action="edit" object={object}>
        <Button variant="outline">
          <Pencil1Icon />
        </Button>
      </EditComponent>
      <ToggleVisibility action={toggleVisibilityAction} id={id} idKey={id_key} is_hidden={is_hidden} />
      <Delete variant="icon" action={deleteAction} id={id} idKey={id_key} />
    </TableCell>
  );
};

export default CommonActionsTableCell;
