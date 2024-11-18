import { getOwnerSettings } from '@/db/ownerSettings/getOwnerSettings';
import Image from 'next/image';
import Link from 'next/link';
import Typography from '../ui/typography';

const NavbarTitle = async () => {
  const ownerSettings = await getOwnerSettings();

  return (
    <div className="flex items-center space-x-3">
      <Link href="/">
        <Image src={ownerSettings.logo ?? '/icon.jpg'} alt="Logo" width={50} height={50} />
      </Link>
      <Typography variant="h2" className="tracking-tighter ">
        <Link href="/">{ownerSettings.title ?? 'Fit X'}</Link>
      </Typography>
    </div>
  );
};

export default NavbarTitle;
