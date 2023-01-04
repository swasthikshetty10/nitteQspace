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
    // in 1 jan 2022 format
    return new Date(dateTime).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
}

export function getTimeInAMPM(dateTime: Date): string {
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${minutesStr} ${ampm}`;
}
