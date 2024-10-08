'use client';

import { Button } from '@/components/ui/button';
import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { cn } from '@/utils/cn';
import { getSubscriptionSession } from '@/utils/db/subscriptions/getSubscriptionSession';
import { useState } from 'react';
import SubscriptionSessionState from './subscriptionSessionState';
import SubscriptionSessionHover from './subscriptionSessionHover';
import { getSubscriptionHistoryState, getSubscriptionHistoryStateColor } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { getButtonColorStyle } from '@/utils/colors';

const SubscriptionHistoryBox = ({
  session,
  subscription_sessions,
  is_completed,
  index,
  size = 'large',
  color,
  hover = true,
}: {
  session?: SubscriptionSession;
  subscription_sessions: SubscriptionSession[];
  is_completed: boolean;
  index: number;
  size?: 'small' | 'large';
  color: string;
  hover?: boolean;
}) => {
  const [active, setActive] = useState(false);
  const state = getSubscriptionHistoryState(subscription_sessions, index, is_completed);

  return (
    <Button
      className={cn(size === 'small' ? 'h-8 w-8' : 'h-12 w-12', hover ? 'cursor-auto' : 'cursor-default')}
      variant={getSubscriptionSession(subscription_sessions, index) ? 'default' : 'outline'}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      style={getButtonColorStyle(getSubscriptionHistoryStateColor(state, color))}
    >
      <SubscriptionSessionState handleClick={() => setActive(true)} state={state} />
      {hover && <SubscriptionSessionHover active={active} color={color} state={state} session={session} />}
    </Button>
  );
};

export default SubscriptionHistoryBox;
