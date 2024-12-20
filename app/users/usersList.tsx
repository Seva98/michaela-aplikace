import ChangeOrder from '@/components/common/changeOrder';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import EditUserDialog from '@/components/edit/editUserDialog';
import { deleteUser } from '@/db/users/deleteUser';
import { getAllUsers } from '@/db/users/getUsers';
import { changeUserOrder, toggleUserVisibility } from '@/db/users/updateUser';
import { getTextColorStyle } from '@/utils/colors';
import { getName } from '@/utils/db/user/getName';

import Link from 'next/link';
import TableRowWithError from '@/components/common/error/tableRowWithError';
import CommonActionsTableCell from '@/components/common/actionButton/commonActionsTableCell';
import { Route } from 'next';
import Color from '@/components/common/color';

const UsersList = async () => {
  const users = await getAllUsers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pořadí</TableHead>
          <TableHead>Jméno</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Akce</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRowWithError key={`subscription-${user.user_id}`}>
            <TableCell className="w-24">
              <ChangeOrder action={changeUserOrder} id={user.user_id} idKey="user_id" itemIndex={i} itemsLength={users.length} size="xs" />
            </TableCell>
            <TableCell className="flex space-x-2 items-center">
              <Color color={user.color} />
              <Link href={`/users/${user.user_id}` as Route} className="font-semibold hover:opacity-70">
                <Typography style={getTextColorStyle(user.color)}>{getName(user.first_name, user.last_name)}</Typography>
              </Link>
            </TableCell>
            <TableCell>
              <Typography>{user.email}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{user.phone}</Typography>
            </TableCell>
            <CommonActionsTableCell
              object={user}
              EditComponent={EditUserDialog}
              deleteAction={deleteUser}
              toggleVisibilityAction={toggleUserVisibility}
              id={user.user_id}
              id_key="user_id"
              is_hidden={user.is_hidden}
              size="xs"
            />
          </TableRowWithError>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersList;
