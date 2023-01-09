import { formatDistance, format, isSameDay } from "date-fns";

export function getTimeSince(date: Date) {
  return formatDistance(date, Date.now(), { addSuffix: true });
}

export function getDayOfWeek(date: Date) {
  return format(date, "EEEE").toLowerCase();
}

export function eventDate(startDate: Date, endDate: Date): string {
  if (isSameDay(startDate, endDate)) {
    return format(startDate, "E, LLL do p") + "-" + format(endDate, "p");
  } else {
    return (
      format(startDate, "E LLL, do p") + "-" + format(endDate, "E LLL, do p")
    );
  }
}
