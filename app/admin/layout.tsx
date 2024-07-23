import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '../../utils/roles';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const Admin = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();
  if (!isAdmin(session)) redirect('/');

  return <div>{children}</div>;
};

export default Admin;
