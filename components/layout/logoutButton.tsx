import { LuLogOut } from 'react-icons/lu';
import RoundedButton from '../common/roundedButton';
import Link from 'next/link';

const LogoutButton = () => {
  return (
    <Link href="/auth/logout">
      <RoundedButton>
        <LuLogOut className="scale-110" />
      </RoundedButton>
    </Link>
  );
};

export default LogoutButton;
