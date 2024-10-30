'use client';

import CommonActionsTableCell from '@/components/common/actionButton/commonActionsTableCell';
import Color from '@/components/common/color';
import EditCalendarSessionDialog from '@/components/edit/editCalendarSessionDialog';
import RatingText from '@/components/rating/ratingText';
import { TableCell, TableRow } from '@/components/ui/table';
import { UserSubscriptionDetail } from '@/db/advanced/userSubscriptionWithDetail/userSubscriptionDetail';
import { CalendarSession } from '@/db/calendarSessions/calendarSession';
import { czechDateWithTime } from '@/utils/dates';
import { getName } from '@/utils/db/user/getName';
import { useState } from 'react';

const CalendarSessionRow = ({ session, userSubscriptionDetails }: { session: CalendarSession; userSubscriptionDetails: UserSubscriptionDetail[] }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { session_id, first_name, last_name, note, rating, session_date, color } = session;
  console.log(session);

  return (
    <>
      <TableRow key={session_id} className="hover:bg-teal-400/10 cursor-pointer" onClick={() => setOpenEdit(true)}>
        <TableCell>
          <Color color={color} />
        </TableCell>
        <TableCell className="whitespace-nowrap text-right">{czechDateWithTime(session_date).split(' ')[1]}</TableCell>
        <TableCell className="whitespace-nowrap">{getName(first_name, last_name)}</TableCell>
        <TableCell className="whitespace-nowrap ">
          <RatingText rating={rating} color={color} />
        </TableCell>
        <TableCell className="max-w-max">{note}</TableCell>
        <TableCell />
      </TableRow>
      <EditCalendarSessionDialog action="edit" object={session} open={openEdit} setOpen={setOpenEdit} userSubscriptionDetails={userSubscriptionDetails} />
    </>
  );
};

export default CalendarSessionRow;
