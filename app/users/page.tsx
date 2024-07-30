import Section from '@/components/containers/section';
import NewUser from './newUser';
import UsersList from './usersList';
import { getAllUsers } from '@/db/users/getUsers';
import { cn } from '@/utils/cn';
import UsersListHeader from './usersListHeader';

const Subscriptions = async () => {
  const users = await getAllUsers();
  const gridClass = 'grid grid-cols-[95px_30px_1fr_1fr_1fr_20px_110px_110px_110px] gap-2 items-center';

  return (
    <Section className="relevant" title="Klienti" linkBack>
      <div className="flex flex-col gap-4 shadow-lg w-fit  border border-gray-100 p-4">
        <UsersListHeader gridClass={gridClass} />
        <UsersList users={users} gridClass={gridClass} />
        <NewUser />
      </div>
    </Section>
  );
};

export default Subscriptions;
