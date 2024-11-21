import Typography from '@/components/ui/typography';
import { getUserByEmail } from '@/db/users/getUsers';
import { getName } from '@/utils/db/user/getName';
import { auth0 } from '@/utils/auth0';

const WelcomeMessage = async () => {
  const session = await auth0.getSession();
  const user = await getUserByEmail(session?.user.email);

  return user && <Typography variant="h2">Vítej {getName(user.first_name, user.last_name)}!</Typography>;
};

export default WelcomeMessage;
