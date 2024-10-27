import { getCalendarSessions } from '@/db/calendarSessions/getCalendarSessions';
import { daysLaterIsoString, today } from '@/utils/dates';
import { getSameDateSessions } from '@/utils/db/sessions/getSameDateSessions';
import { unstable_noStore } from 'next/cache';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Fragment } from 'react';
import CalendarDayRow from './calendarDayRow';
import CalendarSessionRow from './calendarSessionRow';

const Calendar = async () => {
  unstable_noStore();
  const sessions = await getCalendarSessions(today(), daysLaterIsoString(90));

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
              <CalendarDayRow index={i} />
              {sameDateSessions.map((session, index) => (
                <CalendarSessionRow key={session.session_id} session={session} index={index} />
              ))}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Calendar;
