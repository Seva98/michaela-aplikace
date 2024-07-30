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
