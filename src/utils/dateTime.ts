import { differenceInCalendarDays } from "date-fns";
export function getDateAgoString(dateTime: string): string {
  const daysAgo = differenceInCalendarDays(new Date(), new Date(dateTime));

  if (daysAgo === 0) {
    return "today";
  } else if (daysAgo === 1) {
    return "yesterday";
  } else if (daysAgo > 1 && daysAgo <= 7) {
    return `${daysAgo} days ago`;
  } else {
    return new Date(dateTime).toLocaleDateString();
  }
}

export function getTimeInAMPM(dateTime: Date): string {
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}
