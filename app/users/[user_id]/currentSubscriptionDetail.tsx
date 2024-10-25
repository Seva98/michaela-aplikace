import { unstable_noStore } from 'next/cache';
import { UserPageParams } from './page';
import { czechDate } from '@/utils/dates';
import Rating from '@/components/form/rating';
import Typography from '@/components/ui/typography';
import { getUserSubscritpitonsWithSessions } from '@/db/userSubscriptionsWithSessions/getUserSubscriptionsWithSessions';
import Note from '@/components/form/note';
import { getUserById } from '@/db/users/getUsers';
import FormSubmitButton from '@/components/common/formSubmitButton';
import { updateSession } from '@/db/sessions/updateSession';
import Delete from '@/components/common/delete';
import { deleteSession } from '@/db/sessions/deleteSession';
import Save from '@/components/common/save';
import GrowingTextarea from '@/components/common/growingTextarea';

const CurrentSubscriptionDetail = async ({ params }: UserPageParams) => {
  unstable_noStore();
  const { user_id } = await params;
  const user = await getUserById(user_id);

  const userSubSessions = await getUserSubscritpitonsWithSessions(user_id, 20, 0);

  return (
    <div className="flex flex-col gap-4 shadow-lg  border border-gray-100 p-4 ">
      <Typography variant="h3">Poslední tréninky</Typography>
      {userSubSessions.map(({ subscription_name, start_date, completion_date, sessions, user_subscription_id }) => (
        <div className="flex flex-col gap-2" key={`user-subscription-${user_subscription_id}`}>
          <div>
            <Typography variant="h4">{subscription_name}</Typography>
            <Typography variant="small">
              {czechDate(start_date)} - {czechDate(completion_date)}
            </Typography>
          </div>

          {sessions &&
            sessions.map(({ session_date, rating, note, session_id }, i) => (
              <div className="grid grid-cols-[25px_1fr_82px] gap-2 items-center" key={`session-detail-${session_id}`}>
                <Typography variant="large">#{i + 1}</Typography>
                <form className="grid grid-cols-[90px_276px_1fr_auto] gap-2 items-center" action={updateSession}>
                  <div>{czechDate(session_date)}</div>
                  <Rating color={user.color} user_subscription_id={rating} />
                  <GrowingTextarea value={note} name="note" />
                  <input type="hidden" name="session_id" value={session_id} />
                  <Save variant="icon" />
                </form>
                <Delete action={deleteSession} id={session_id} idKey="session_id" variant="icon" />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CurrentSubscriptionDetail;
