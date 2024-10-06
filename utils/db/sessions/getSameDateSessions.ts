import { CalendarSession } from '@/db/calendarSessions/calendarSession';

export const getSameDateSessions = (date: string, sessions: CalendarSession[]) => {
  return sessions.filter((session) => session.session_date.slice(0, 10) === date);
};
