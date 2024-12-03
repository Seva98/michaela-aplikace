import { LuLogOut } from 'react-icons/lu';
import RoundedButton from '../common/roundedButton';
import Link from 'next/link';
import { LOGOUT_URL } from '@/utils/constants';

const LogoutButton = () => {
  return (
    <Link href={LOGOUT_URL}>
      <RoundedButton>
        <LuLogOut className="scale-110" />
      </RoundedButton>
    </Link>
  );
};

export default LogoutButton;
