import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { czechDateWithTime } from '@/utils/dates';
import Typography from '@/components/ui/typography';
import { StarIcon } from '@radix-ui/react-icons';
import { SubscritpionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { getButtonColorStyle } from '@/utils/colors';

const SubscriptionSessionHover = ({
  active,
  state,
  session,
  color,
}: {
  active: boolean;
  state: SubscritpionHistoryState;
  color: string;
  session?: SubscriptionSession;
}) => {
  return (
    active && (
      <div className="relative">
        {state !== 'not_planned' && (
          <div className="absolute min-w-max flex flex-col gap-2 top-0 left-3 p-4 bg-white text-black transition-opacity shadow rounded">
            <Typography>{state === 'completed' ? 'Dokončeno' : state === 'expired' ? 'Expirovalo' : 'Naplánováno'}</Typography>
            {state === 'expired' && <div>Expirovalo</div>}
            {session?.session_date && <div>{czechDateWithTime(session?.session_date)}</div>}
            {session?.rating && (
              <div className="flex gap-1 items-center">
                <Typography>{session.rating}</Typography>
                <div className="w-6 h-6 flex justify-center items-center text-white rounded" style={getButtonColorStyle(color)}>
                  <StarIcon />
                </div>
              </div>
            )}
            {session?.note && <Typography variant="small">{session.note?.slice(0, 90)}</Typography>}
          </div>
        )}
      </div>
    )
  );
};

export default SubscriptionSessionHover;
