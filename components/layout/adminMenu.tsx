'use client';

import Link from 'next/link';
import { FaUser, FaRegCreditCard } from 'react-icons/fa';
import { RiCalendar2Fill, RiHome2Fill, RiQuestionnaireFill } from 'react-icons/ri';
import Typography from '../ui/typography';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import PopupMenu from '@/app/popupMenu';
import { Route } from 'next';
import SettingsButton from './settingsButton';

const items = [
  { icon: <RiHome2Fill />, name: 'Přehled', href: '/' },
  { icon: <RiCalendar2Fill />, name: 'Kalendář', href: '/sessions' },
  { icon: <FaUser />, name: 'Klienti', href: '/users' },
  { icon: <FaRegCreditCard />, name: 'Členství', href: '/subscriptions' },
  { icon: <RiQuestionnaireFill />, name: 'Dotazníky', href: '/questionnaires' },
];

export const AdminMenu = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex space-x-8 justify-center flex-wrap">
      {items.map(({ icon, name, href }) => (
        <Link
          href={href as Route}
          key={`admin-link-${href}`}
          className={cn(
            'flex space-x-2 shadow-md items-center py-1 rounded-md px-3 hover:bg-gradient-to-r hover:bg-teal-800/10 hover:text-teal-900',
            isActive(href) ? 'outline outline-teal-500 ' : '',
          )}
        >
          <div>{icon}</div>
          <Typography variant="h6" className="uppercase">
            {name}
          </Typography>
        </Link>
      ))}
      <PopupMenu className="relative" />
      <SettingsButton />
    </div>
  );
};
