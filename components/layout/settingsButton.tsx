import { LuSettings } from 'react-icons/lu';
import RoundedButton from '../common/roundedButton';
import Link from 'next/link';

const SettingsButton = () => {
  return (
    <Link href="/settings">
      <RoundedButton>
        <LuSettings className="scale-110" />
      </RoundedButton>
    </Link>
  );
};

export default SettingsButton;
