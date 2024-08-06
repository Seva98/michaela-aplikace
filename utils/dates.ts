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

export const remainingDays = (expirationDateStr: string | null) => {
  if (!expirationDateStr) return '-';
  const currentDateStr = new Date().toISOString().split('T')[0];
  const expirationDate = new Date(expirationDateStr);
  const currentDate = new Date(currentDateStr);
  const diffTime = expirationDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
