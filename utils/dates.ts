export const getNextHourDate = (): string => {
  const date = new Date();
  date.setHours(date.getHours() + 1, 0, 0, 0);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:00`;

  return formattedDate;
};

export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const czechDate = (date?: string | null) => {
  if (!date) return '-';
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${day}.${month}.${year}`;
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
