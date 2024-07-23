'use client';

import { Button } from '@/components/ui/button';
import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { cn } from '@/utils/cn';
import { getSubscriptionSession } from '@/utils/data/subscriptions/getSubscriptionSession';
import { czechDate } from '@/utils/dates';
import { useState, useEffect, useRef } from 'react';

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
          <div className="absolute top-0 left-3 p-4 bg-white text-black transition-opacity shadow rounded">{czechDate(session.session_date)}</div>
        )}
      </div>
    </Button>
  );
};

export default SubscriptionHistoryBox;
