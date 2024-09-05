export function toPositiveNumber(value?: string | number): number {
  console.log(value, !isNaN(Number(value)));
  if (value === undefined || value === null || isNaN(Number(value))) {
    return -1;
  }

  return Number(value);
}
