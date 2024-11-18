import Link from 'next/link';
import Typography from '../ui/typography';
import { getOwnerSettings } from '@/db/ownerSettings/getOwnerSettings';

const NavbarLinks = async () => {
  const ownerSettings = await getOwnerSettings();

  return ownerSettings.menu
    ? ownerSettings.menu.map(({ title, href }, index) => (
        <Typography variant="h5" key={`navbar-link-${index}`}>
          <Link className="uppercase" href={href}>
            {title}
          </Link>
        </Typography>
      ))
    : null;
};

export default NavbarLinks;
