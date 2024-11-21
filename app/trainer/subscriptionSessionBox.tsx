'use client';

import { Button } from '@/components/ui/button';
import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import SubscriptionSessionState from './subscriptionSessionState';
import SubscriptionSessionHover from './subscriptionSessionHover';
import { getSubscriptionHistoryStateColor, SubscritpionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { getButtonColorStyle } from '@/utils/colors';
import EditSessionDialog from '@/components/edit/editSessionDialog';

const SubscriptionHistoryBox = ({
  session,
  state,
  size = 'large',
  color,
  hover = true,
}: {
  session?: SubscriptionSession;
  state: SubscritpionHistoryState;
  size?: 'small' | 'large';
  color: string;
  hover?: boolean;
}) => {
  const [active, setActive] = useState(false);

  return session?.session_id ? (
    <EditSessionDialog object={session}>
      <Button
        className={cn(size === 'small' ? 'h-8 w-8' : 'h-12 w-12', hover ? 'cursor-pointer' : 'cursor-default')}
        variant={session ? 'default' : 'outline'}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onTouchStart={() => setActive(true)}
        onTouchEnd={() => setActive(false)}
        style={getButtonColorStyle(getSubscriptionHistoryStateColor(state, color))}
      >
        <SubscriptionSessionState state={state} />
        {hover && <SubscriptionSessionHover active={active} color={color} state={state} session={session} />}
      </Button>
    </EditSessionDialog>
  ) : (
    <Button
      className={cn(size === 'small' ? 'h-8 w-8' : 'h-12 w-12', hover ? 'cursor-pointer' : 'cursor-default')}
      variant={session ? 'default' : 'outline'}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      style={getButtonColorStyle(getSubscriptionHistoryStateColor(state, color))}
    >
      <SubscriptionSessionState state={state} />
      {hover && <SubscriptionSessionHover active={active} color={color} state={state} session={session} />}
    </Button>
  );
};

export default SubscriptionHistoryBox;
