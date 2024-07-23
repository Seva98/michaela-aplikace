import Content from '@/components/containers/content';
import Typography from '@/components/ui/typography';
import { getAllUsers } from '@/db/users/getUsers';

const Users = async () => {
  const users = await getAllUsers();
  return (
    <Content>
      <Typography variant="h2">Uživatelé</Typography>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="flex gap-2 items-end">
            <Typography variant="h3">{user.name}</Typography>
            <Typography variant="p">{user.email}</Typography>
            <Typography variant="p">{user.phone}</Typography>
            <Typography variant="p">{user.address}</Typography>
            <Typography variant="p">{user.dateOfBirth}</Typography>
          </div>
        ))
      ) : (
        <Typography variant="p">Žádný uživatel nebyl nalezen</Typography>
      )}
    </Content>
  );
};

export default Users;
