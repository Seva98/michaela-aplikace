import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { czechDateWithTime, getCzechWeekdayName, isHoursDifferenceMoreThan } from '@/utils/dates';
import SubscriptionSessionState from '../subscriptionSessionState';
import { getSubscriptionHistoryState, getSubscriptionHistoryStateColor } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { Button } from '@/components/ui/button';
import SubscriptionHistoryBox from '../subscriptionSessionBox';
import Typography from '@/components/ui/typography';

const SubscriptionHistoryRow = ({
  session,
  subscription_sessions,
  is_completed,
  index,
  color,
  isExpired,
}: {
  session?: SubscriptionSession;
  subscription_sessions: SubscriptionSession[];
  is_completed: boolean;
  index: number;
  color: string;
  isExpired: boolean;
}) => {
  const state = getSubscriptionHistoryState(subscription_sessions, index, is_completed);

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 items-center">
        <SubscriptionHistoryBox
          session={session}
          subscription_sessions={subscription_sessions}
          is_completed={is_completed}
          index={index}
          color={color}
          size="small"
          hover={false}
        />

        {session?.session_date ? (
          <div className="grid grid-cols-[75px_1fr]">
            <Typography>{getCzechWeekdayName(session?.session_date)}</Typography>
            <Typography>{czechDateWithTime(session?.session_date)}</Typography>
          </div>
        ) : (
          <Typography>Nenaplánováno </Typography>
        )}
      </div>
      {state === 'planned' && isHoursDifferenceMoreThan(24, new Date().toISOString(), session?.session_date) && (
        <Button variant={'destructive'} disabled={isExpired}>
          Zrušit trénink
        </Button>
      )}
    </div>
  );
};

export default SubscriptionHistoryRow;
