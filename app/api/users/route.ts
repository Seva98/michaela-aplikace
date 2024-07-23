import { getAllUsers } from '@/db/users/getUsers';

export async function GET() {
  const users = await getAllUsers();

  return users;
}
