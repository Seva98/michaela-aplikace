import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import { czechDateWithTime } from '@/utils/dates';
import Typography from '@/components/ui/typography';
import { SubscritpionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';
import Markdown from '@/components/common/markdown';
import RatingText from '@/components/rating/ratingText';

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
      <div className="relative cursor-auto normal-case ">
        {state !== 'not_planned' && (
          <div className="absolute max-w-sm flex flex-col gap-2 top-0 left-3 p-4 bg-white text-black transition-opacity rounded-lg shadow-2xl outline outline-teal-700/30">
            {session?.session_date && <div>{czechDateWithTime(session?.session_date)}</div>}
            <div className="flex space-x-2 justify-center">
              {session?.rating && session.rating >= 0 && <RatingText rating={session.rating} color={color} />}
              <Typography>{state === 'completed' ? 'Dokončeno' : state === 'expired' ? 'Expirovalo' : 'Naplánováno'}</Typography>
            </div>
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
