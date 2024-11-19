import Link from 'next/link';
import Typography from '../ui/typography';
import { getOwnerSettings } from '@/db/ownerSettings/getOwnerSettings';

const NavbarLinks = async () => {
  const ownerSettings = await getOwnerSettings();

  return ownerSettings.menu ? (
    ownerSettings.menu.map(({ title, href }, index) => (
      <Typography variant="h5" key={`navbar-link-${index}`}>
        <Link className="uppercase" href={href}>
          {title}
        </Link>
      </Typography>
    ))
  ) : (
    <Typography variant="h5" key={`navbar-link-${1}`}>
      <Link className="uppercase" href={'/'}>
        Aplikace
      </Link>
    </Typography>
  );
};

export default NavbarLinks;
