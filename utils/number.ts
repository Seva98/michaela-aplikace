export function toPositiveNumber(value?: string | number): number {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return -1;
  }

  return Number(value);
}
