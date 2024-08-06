import { getUserByEmail } from '@/db/users/getUsers';
import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';

const ProfilePicture = async () => {
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);

  return (
    user?.image && (
      <Image
        src={user.image}
        alt="Profile image"
        width={292}
        height={512}
        className="w-[292px] aspect-[9/16] shadow-lg  block bg-transparent bg-cover bg-center"
      />
    )
  );
};

export default ProfilePicture;
