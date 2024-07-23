import Content from '@/components/containers/content';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import { getAllConfigurations } from '@/db/configurations/getConfigurations';
import { getAllUsers } from '@/db/users/getUsers';

const ClientsList = async () => {
  const users = await getAllUsers();
  const configs = await getAllConfigurations();

  return (
    <Content>
      <Typography variant="h2">Seznam klientů</Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jméno</TableHead>
            <TableHead>Předplatné</TableHead>
            <TableHead>Zapsat trénink</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableHead>{user.name}</TableHead>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  );
};

export default ClientsList;
