'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import EditUser from '@/components/user/editUser';
import { cn } from '@/utils/cn';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

  return (
    <div className={className} ref={popupRef}>
      <div className={cn('absolute top-8 right-20  transition-opacity', opened ? 'opacity-100' : 'opacity-0')}>
        <div className="bg-white border border-gray-100 shadow-xl p-4 flex flex-col gap-4">
          <Typography variant="h6">Klienti</Typography>
          <EditUser action="create">
            <Button variant="outline" className="w-full" onClick={() => setOpened(false)}>
              Přidat klienta
            </Button>
          </EditUser>
          <Link href="/users">
            <Button variant="outline" className="w-full" onClick={() => setOpened(false)}>
              Spravovat klienty
            </Button>
          </Link>
          <Typography variant="h6">Členství</Typography>
          <Link href="/subscriptions">
            <Button variant="outline" className="w-full" onClick={() => setOpened(false)}>
              Spravovat členství
            </Button>
          </Link>
        </div>
      </div>
      <Button
        variant="outline"
        className={cn('rounded-full p-0 h-12 w-12 shadow-lg border-gray-100 absolute top-4 right-4 transition-transform', opened ? 'rotate-45' : 'rotate-0')}
        onClick={() => setOpened(!opened)}
      >
        <PlusIcon className="scale-150" />
      </Button>
    </div>
  );
};

export default PopupMenu;
