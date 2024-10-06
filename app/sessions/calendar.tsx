import { getCalendarSessions } from '@/db/calendarSessions/getCalendarSessions';
import { cn } from '@/utils/cn';
import { czechDateDaysLater, czechDateWithTime, daysLaterIsoString, today } from '@/utils/dates';
import { getSameDateSessions } from '@/utils/db/sessions/getSameDateSessions';
import { getName } from '@/utils/db/user/getName';
import { unstable_noStore } from 'next/cache';

const calendarColors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100', 'bg-indigo-100', 'bg-gray-100'];

const Calendar = async () => {
  unstable_noStore();
  const sessions = await getCalendarSessions(today(), daysLaterIsoString(90));

  return (
    <div className="flex flex-col">
      {Array.from({ length: 90 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className={cn(calendarColors[i % calendarColors.length])}>{czechDateDaysLater(i)}</div>
          {getSameDateSessions(daysLaterIsoString(i), sessions).map(({ session_id, first_name, last_name, note, rating, session_date }) => (
            <div key={session_id} className="grid grid-cols-[150px_150px_50px_auto] pl-4">
              <div>{czechDateWithTime(session_date)}</div>
              <div>{getName(first_name, last_name)}</div>
              <div>{rating}</div>
              <div>{note}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
