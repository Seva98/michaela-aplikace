import { getCalendarSessions } from '@/db/calendarSessions/getCalendarSessions';
import { daysLaterIsoString, today } from '@/utils/dates';
import { getSameDateSessions } from '@/utils/db/sessions/getSameDateSessions';
import { unstable_noStore } from 'next/cache';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Fragment } from 'react';
import CalendarDayRow from './calendarDayRow';
import CalendarSessionRow from './calendarSessionRow';
import { getAllUsersLatestSubscriptionWithDetail } from '@/db/advanced/userSubscriptionWithDetail/getUserSubscriptionWithDetail';

const Calendar = async () => {
  unstable_noStore();
  const sessions = await getCalendarSessions(today(), daysLaterIsoString(90));
  const userSubscriptionDetails = await getAllUsersLatestSubscriptionWithDetail();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Den</TableHead>
          <TableHead className="whitespace-nowrap">Datum</TableHead>
          <TableHead className="whitespace-nowrap">Jméno</TableHead>
          <TableHead className="whitespace-nowrap">Hodnocení</TableHead>
          <TableHead className="w-full">Poznámka</TableHead>
          <TableHead>Akce</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 90 }).map((_, i) => {
          const sameDateSessions = getSameDateSessions(daysLaterIsoString(i), sessions);
          return (
            <Fragment key={i}>
              <CalendarDayRow index={i} userSubscriptionDetails={userSubscriptionDetails} lastSessionOfDay={sameDateSessions.at(-1)} />
              {sameDateSessions.map((session) => (
                <CalendarSessionRow key={session.session_id} session={session} userSubscriptionDetails={userSubscriptionDetails} />
              ))}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Calendar;
