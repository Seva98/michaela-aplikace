import { SubscriptionSession } from '@/db/userSubscription/userSubscription';
import { czechDateWithTime } from '@/utils/dates';
import Typography from '@/components/ui/typography';
import { StarIcon } from '@radix-ui/react-icons';
import { SubscritpionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';
import { getButtonColorStyle } from '@/utils/colors';
import Markdown from '@/components/common/markdown';

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
      <div className="relative cursor-auto">
        {state !== 'not_planned' && (
          <div className="absolute max-w-sm flex flex-col gap-2 top-0 left-3 p-4 bg-white text-black transition-opacity shadow rounded ">
            <div className="flex space-x-2 justify-center">
              {session?.rating && (
                <div className="flex gap-1 items-center">
                  <Typography>{session.rating + 1}</Typography>
                  <div className="w-6 h-6 flex justify-center items-center text-white rounded" style={getButtonColorStyle(color)}>
                    <StarIcon />
                  </div>
                </div>
              )}
              <Typography>{state === 'completed' ? 'Dokončeno' : state === 'expired' ? 'Expirovalo' : 'Naplánováno'}</Typography>
            </div>
            {session?.session_date && <div>{czechDateWithTime(session?.session_date)}</div>}
            {session?.note && (
              <div className="max-w-sm whitespace-pre-wrap text-left text-sm">
                <Markdown content={session.note} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default SubscriptionSessionHover;
