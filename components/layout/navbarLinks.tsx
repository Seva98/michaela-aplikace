import Link from 'next/link';
import Typography from '../ui/typography';
import { getOwnerSettings } from '@/db/ownerSettings/getOwnerSettings';
import { isHomepage } from '@/utils/checks/isHomepage';
import { Button } from '../ui/button';
import { auth0 } from '@/utils/auth0';

const NavbarLinks = async () => {
  const ownerSettings = await getOwnerSettings();
  const session = await auth0.getSession();

  return ownerSettings.menu && !isHomepage ? (
    ownerSettings.menu.map(({ title, href }, index) => (
      <Typography variant="h5" key={`navbar-link-${index}`}>
        <Link className="uppercase" href={href}>
          {title}
        </Link>
      </Typography>
    ))
  ) : (
    <Typography variant="h5">
      <Link className="uppercase" href={session ? '/app' : '/api/auth/login'}>
        <Button>{session ? 'Aplikace' : 'Přihlásit se'}</Button>
      </Link>
    </Typography>
  );
};

export default NavbarLinks;
