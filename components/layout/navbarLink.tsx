import Link from 'next/link';
import Typography from '../ui/typography';
import { Button } from '../ui/button';

type NavbarLink = {
  href: string;
  children: React.ReactNode;
};

const NavbarLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link className="uppercase" href={href}>
      <Button variant="ghost" className="p-0">
        <Typography variant="h5">{text}</Typography>
      </Button>
    </Link>
  );
};

export default NavbarLink;
