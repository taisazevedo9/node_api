import { setYear, parseISO } from "date-fns";
/**
 * Returns a future date that is the specified number of years from now.
 * @param yearsFromNow - The number of years to add to the current date.
 * @returns A Date object representing the future date.
 */

export function getFutureDate(date: string): Date {
  const futureDate = new Date();
  return setYear(parseISO(date), futureDate.getFullYear() + 1);
}
