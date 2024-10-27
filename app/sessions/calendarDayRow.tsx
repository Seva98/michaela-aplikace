'use client';

import EditCalendarSessionDialog from '@/components/edit/editCalendarSessionDialog';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { czechDateDaysLater, daysLaterIsoString, getCzechWeekdayName } from '@/utils/dates';
import { PlusIcon } from '@radix-ui/react-icons';
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

const CalendarDayRow = ({ index: i }: { index: number }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TableRow
        className={cn('hover:cursor-pointer', calendarColors[i % calendarColors.length], hoverColors[i % calendarColors.length])}
        onClick={() => setOpenEdit(true)}
      >
        <TableCell>{getCzechWeekdayName(daysLaterIsoString(i))}</TableCell>
        <TableCell className="whitespace-nowrap">{czechDateDaysLater(i)}</TableCell>
        <TableCell colSpan={3} />
        <TableCell>
          <Button variant="outline" size="xs" onClick={() => setOpenEdit(true)}>
            <PlusIcon className="scale-125" />
          </Button>
        </TableCell>
      </TableRow>
      <EditCalendarSessionDialog action="create" open={openEdit} setOpen={setOpenEdit} />
    </>
  );
};

export default CalendarDayRow;
