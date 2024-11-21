'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NewUser from './users/newUser';
import NewSubscription from './subscriptions/newSubscription';
import RoundedButton from '@/components/common/roundedButton';

const PopupMenu = ({ className }: { className: string }) => {
  const [opened, setOpened] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setOpened(false);
    }
  };

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  const close = () => setOpened(false);

  return (
    <div className={className} ref={popupRef}>
      <div className={cn('absolute top-4 right-10  transition-opacity', opened ? 'opacity-100 z-50' : 'opacity-0 -z-50')}>
        <div className="bg-white border border-gray-100 shadow-xl p-4 flex flex-col gap-4">
          <Typography variant="h6">Klienti</Typography>
          <NewUser data-testid="create-client-popup-menu" />
          <Typography variant="h6">Členství</Typography>
          <NewSubscription />
          <Typography variant="h6">Dotazníky</Typography>
          <Link href="/trainer/questionnaires/new">
            <Button variant="outline" className="w-full" onClick={close}>
              Přidat dotazník
            </Button>
          </Link>
        </div>
      </div>
      <RoundedButton onClick={() => setOpened(!opened)} data-testid="popup-menu">
        <PlusIcon className="scale-125" />
      </RoundedButton>
    </div>
  );
};

export default PopupMenu;
