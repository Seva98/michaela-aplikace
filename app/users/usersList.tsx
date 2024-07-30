import ChangeOrder from '@/components/common/changeOrder';
import ComponentWithError from '@/components/common/componentWithError';
import Delete from '@/components/common/delete';
import FormSubmitButton from '@/components/common/formSubmitButton';
import ToggleVisibility from '@/components/common/toggleVisibility';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import EditUser from '@/components/user/editUser';
import { deleteUser } from '@/db/users/deleteUser';
import { changeUserOrder, toggleUserVisibility } from '@/db/users/updateUser';
import { User } from '@/db/users/user';
import { cn } from '@/utils/cn';
import { getName } from '@/utils/data/user/getName';
import { TriangleRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const UsersList = ({ users, gridClass }: { users: User[]; gridClass: string }) => {
  return (
    <>
      {users.map((user, i) => (
        <ComponentWithError key={`subscription-${user.user_id}`}>
          <div className={cn(gridClass)}>
            <ChangeOrder action={changeUserOrder} id={user.user_id} idKey="user_id" itemIndex={i} itemsLength={users.length} />
            <div className="w-6 h-6" style={{ backgroundColor: user.color }} />
            <Typography>{getName(user.first_name, user.last_name)}</Typography>

            <Typography>{user.email}</Typography>
            <Typography>{user.phone}</Typography>
            <Link href={`/users/${user.user_id}`} className="flex justify-between items-center">
              <TriangleRightIcon className="w-6 h-6" />
            </Link>
            <EditUser action="edit" user={user}>
              <Button variant="outline">Upravit</Button>
            </EditUser>
            <ToggleVisibility action={toggleUserVisibility} id={user.user_id} idKey="user_id" is_hidden={user.is_hidden} />
            <Delete action={deleteUser} id={user.user_id} idKey="user_id" />
          </div>
        </ComponentWithError>
      ))}
      <hr />
    </>
  );
};

export default UsersList;
