import { Button, ButtonSize, buttonVariants } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { Pencil1Icon } from '@radix-ui/react-icons';
import ToggleVisibility from './toggleVisibility';
import Delete from '../delete';
import { FC, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

const CommonActionsTableCell = ({
  object,
  EditComponent,
  toggleVisibilityAction,
  id,
  id_key,
  is_hidden,
  deleteAction,
  size = 'default',
}: {
  object: any;
  EditComponent?: FC<PropsWithChildren<{ action: 'create' | 'edit'; object: any }>>;
  toggleVisibilityAction?: (formData: FormData) => Promise<void>;
  id?: number;
  id_key?: string;
  is_hidden?: boolean;
  deleteAction?: (formData: FormData) => Promise<void>;
  size?: ButtonSize;
}) => {
  return (
    <TableCell className="flex space-x-2">
      {EditComponent && (
        <EditComponent action="edit" object={object}>
          <Button variant="outline" size={size}>
            <Pencil1Icon />
          </Button>
        </EditComponent>
      )}
      {toggleVisibilityAction && id && id_key && is_hidden !== undefined && (
        <ToggleVisibility action={toggleVisibilityAction} id={id} idKey={id_key} is_hidden={is_hidden} size={size} />
      )}
      {deleteAction && id && id_key && <Delete variant="icon" action={deleteAction} id={id} idKey={id_key} size={size} />}
    </TableCell>
  );
};

export default CommonActionsTableCell;
