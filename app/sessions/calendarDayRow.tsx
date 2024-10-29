'use client';

import EditCalendarSessionDialog from '@/components/edit/editCalendarSessionDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { UserSubscriptionDetail } from '@/db/advanced/userSubscriptionWithDetail/userSubscriptionDetail';
import { CalendarSession } from '@/db/calendarSessions/calendarSession';
import { cn } from '@/utils/cn';
import { czechDateDaysLater, daysLaterIsoString, getCzechWeekdayName } from '@/utils/dates';
import { useState } from 'react';

const calendarColors = ['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 'bg-purple-50', 'bg-indigo-50', 'bg-gray-50'];
const hoverColors = [
  'hover:bg-red-400/30',
  'hover:bg-blue-400/30',
  'hover:bg-green-400/30',
  'hover:bg-yellow-400/30',
  'hover:bg-pink-400/30',
  'hover:bg-purple-400/30',
  'hover:bg-indigo-400/30',
  'hover:bg-gray-400/30',
];

const CalendarDayRow = ({
  index: i,
  userSubscriptionDetails,
  lastSessionOfDay,
}: {
  index: number;
  userSubscriptionDetails: UserSubscriptionDetail[];
  lastSessionOfDay?: CalendarSession;
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const defaultIsoDate = (() => {
    if (!lastSessionOfDay) {
      return `${daysLaterIsoString(i)}T08:00:00`;
    } else {
      const lastDate = new Date(lastSessionOfDay.session_date);
      lastDate.setHours(lastDate.getHours() + 1);
      const pad = (num: number) => num.toString().padStart(2, '0');
      const year = lastDate.getFullYear();
      const month = pad(lastDate.getMonth() + 1);
      const day = pad(lastDate.getDate());
      const hours = pad(lastDate.getHours());
      const minutes = pad(lastDate.getMinutes());
      const seconds = pad(lastDate.getSeconds());
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
  })();

  return (
    <>
      <TableRow
        className={cn('hover:cursor-pointer', calendarColors[i % calendarColors.length], hoverColors[i % calendarColors.length])}
        onClick={() => setOpenEdit(true)}
      >
        <TableCell>{getCzechWeekdayName(daysLaterIsoString(i))}</TableCell>
        <TableCell className="whitespace-nowrap">{czechDateDaysLater(i)}</TableCell>
        <TableCell colSpan={4} />
      </TableRow>
      <EditCalendarSessionDialog
        action="create"
        open={openEdit}
        setOpen={setOpenEdit}
        userSubscriptionDetails={userSubscriptionDetails}
        defaultIsoDate={defaultIsoDate}
      />
    </>
  );
};

export default CalendarDayRow;
