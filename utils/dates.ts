import { SubscriptionExpired } from './db/subscriptions/geSubscritionStatus';

export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const daysLater = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const daysLaterIsoString = (days: number) => {
  const date = daysLater(days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const czechDateDaysLater = (days: number) => czechDate(daysLater(days).toISOString());

export const todayWithTime = () => {
  const date = new Date();
  const hours = String(date.getHours() - 1).padStart(2, '0');
  const minutes = '00';

  return `${today()}T${hours}:${minutes}`;
};

export const czechDate = (date?: string | null) => {
  if (!date) return '-';
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${day}.${month}.${year}`;
};

export const czechDateWithTime = (date?: string | null) => {
  if (!date) return '-';
  const [year, month, day] = date.slice(0, 10).split('-');
  const [hours, minutes] = date.slice(11, 16).split(':');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const getCzechWeekdayName = (isoDateString?: string): string => {
  if (!isoDateString) return '-';

  const czechWeekdays = [
    'Neděle', // 0 - Sunday
    'Pondělí', // 1 - Monday
    'Úterý', // 2 - Tuesday
    'Středa', // 3 - Wednesday
    'Čtvrtek', // 4 - Thursday
    'Pátek', // 5 - Friday
    'Sobota', // 6 - Saturday
  ];
  const date = new Date(isoDateString);
  const dayOfWeek = date.getDay();
  return czechWeekdays[dayOfWeek];
};

export const isExpired = (expirationDateStr: string | null) => {
  if (!expirationDateStr) return false;
  const currentDateStr = new Date().toISOString().split('T')[0];

  return currentDateStr > expirationDateStr;
};

export const calculateAge = (birthday?: string) => {
  if (!birthday) return '-';
  const birthDate = new Date(birthday);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const remainingDays = (expirationDateStr: string | null) => {
  if (!expirationDateStr) return SubscriptionExpired.NEVER_EXPIRES;
  const currentDateStr = new Date().toISOString().split('T')[0];
  const expirationDate = new Date(expirationDateStr);
  const currentDate = new Date(currentDateStr);
  const diffTime = expirationDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `Zbývá ${diffDays} dní`;
  return SubscriptionExpired.EXPIRED;
};

const hoursDifference = (date1: string, date2: string) => {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);
  const diffTime = Math.abs(date2Obj.getTime() - date1Obj.getTime());
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  return diffHours;
};

export const isHoursDifferenceMoreThan = (hours: number, date1?: string, date2?: string) => {
  if (!date1 || !date2) return false;
  return hoursDifference(date1, date2) > hours;
};
