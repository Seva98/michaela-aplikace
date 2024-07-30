'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { cn } from '@/utils/cn';
import { getSubscriptionSession } from '@/utils/data/subscriptions/getSubscriptionSession';
import { czechDate } from '@/utils/dates';
import { StarIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const SubscriptionHistoryBox = ({
  session,
  subscription_sessions,
  index,
  size = 'large',
  color,
}: {
  session: SubscriptionSession | null;
  subscription_sessions: SubscriptionSession[];
  index: number;
  size?: 'small' | 'large';
  color: string;
}) => {
  const [active, setActive] = useState(false);

  return (
    <Button
      className={cn(size === 'small' ? 'h-8 w-8' : 'h-12 w-12')}
      variant={getSubscriptionSession(subscription_sessions, index) ? 'default' : 'outline'}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      style={{
        backgroundColor: session ? color : '',
      }}
    >
      <div className="relative">
        <div className="flex h-full justify-center items-center text-white" onClick={() => setActive(true)}>
          ✔
        </div>
        {session && active && (
          <div className="absolute flex flex-col gap-2 top-0 left-3 p-4 bg-white text-black transition-opacity shadow rounded">
            <div>{czechDate(session.session_date)}</div>
            <div className="flex gap-1">
              <Typography>{session.rating}</Typography>
              <div className="w-6 h-6 flex justify-center items-center text-white rounded" style={{ backgroundColor: color }}>
                <StarIcon />
              </div>
            </div>
            <Typography variant="small">{session.note?.slice(0, 90)}</Typography>
          </div>
        )}
      </div>
    </Button>
  );
};

export default SubscriptionHistoryBox;
