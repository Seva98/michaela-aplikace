import Markdown from '@/components/common/markdown';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import EditUser from '@/components/edit/editUser';
import { getUserById } from '@/db/users/getUsers';
import { getName } from '@/utils/db/user/getName';
import { calculateAge, czechDate } from '@/utils/dates';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { unstable_noStore } from 'next/cache';
import { FaHome, FaPhone } from 'react-icons/fa';
import { RiMailFill } from 'react-icons/ri';
import { UserPageParams } from './page';

const ProfileDetails = async ({ params }: UserPageParams) => {
  unstable_noStore();
  const { user_id } = await params;
  const user = await getUserById(user_id);
  const { created_at, email, first_name, last_name, address, bio, birthday, phone } = user;

  return (
    <div className="flex flex-col gap-4 shadow-lg p-4 border border-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography variant="h2">{getName(first_name, last_name)}</Typography>
          <EditUser object={user} action="edit">
            <Button variant="ghost">
              <Pencil1Icon />
            </Button>
          </EditUser>
        </div>
        <Typography variant="small">{calculateAge(birthday)}</Typography>
        <Typography variant="small">Klientem od {czechDate(created_at)}</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="h3">Kontaktní údaje</Typography>
        <div className="flex gap-8">
          <Typography className="flex gap-1 items-center">
            <RiMailFill />
            <a href={`mailto:${email}`}>{email}</a>
          </Typography>
          <Typography className="flex gap-1 items-center">
            <FaPhone />
            <a href={`tel:${phone}`}>{phone}</a>
          </Typography>
          <Typography className="flex gap-1 items-center">
            <FaHome />
            {address}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="h3">Bio</Typography>
        <div className="h-full scroll-auto">
          <Markdown content={bio} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
