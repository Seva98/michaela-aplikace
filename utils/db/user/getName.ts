export const getName = (first_name: string, last_name: string) => {
  if (first_name && last_name) return `${first_name} ${last_name}`;
  if (first_name) return first_name;
  if (last_name) return last_name;
  return 'Volný termín'.toUpperCase();
};
