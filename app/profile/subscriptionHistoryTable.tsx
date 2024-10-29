import Typography from '@/components/ui/typography';
import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import SubscriptionHistoryRow from './subscriptionHistoryRow';
import { Button } from '@/components/ui/button';

const SubscriptionHistoryTable = async ({
  subscription_sessions,
  number_of_sessions,
  is_completed,
  color,
  isExpired,
}: {
  subscription_sessions: SubscriptionSession[];
  number_of_sessions: number;
  is_completed: boolean;
  color: string;
  isExpired: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {subscription_sessions.map((subscriptionSession, i) => (
        <SubscriptionHistoryRow
          key={`session-${i}`}
          session={subscriptionSession}
          subscription_sessions={subscription_sessions}
          is_completed={is_completed}
          index={i}
          color={color}
          isExpired={isExpired}
        />
      ))}
      {isExpired && <Typography variant="error-standard">Expirované členství - nelze naplánovat další tréninky nebo zrušit již naplánované</Typography>}
      {!isExpired && subscription_sessions.length < number_of_sessions && <Button className="w-fit">Naplánovat další trénink</Button>}
    </div>
  );
};

export default SubscriptionHistoryTable;
