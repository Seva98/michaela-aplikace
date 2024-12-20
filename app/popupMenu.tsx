'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/utils/cn';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NewUser from './users/newUser';
import NewSubscription from './subscriptions/newSubscription';

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
          <NewUser />
          <Typography variant="h6">Členství</Typography>
          <NewSubscription />
          <Typography variant="h6">Dotazníky</Typography>
          <Link href="/questionnaires/new">
            <Button variant="outline" className="w-full" onClick={close}>
              Přidat dotazník
            </Button>
          </Link>
        </div>
      </div>
      <Button
        variant="outline"
        className={cn('rounded-full p-0 h-8 w-8 shadow-md border-gray-100 transition-transform', opened ? 'rotate-45' : 'rotate-0')}
        onClick={() => setOpened(!opened)}
      >
        <PlusIcon className="scale-125" />
      </Button>
    </div>
  );
};

export default PopupMenu;
