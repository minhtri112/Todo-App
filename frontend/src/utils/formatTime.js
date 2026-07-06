import { format, isValid, parseISO } from "date-fns";

function formatTimeOnly(timeValue) {
  if (!timeValue) return "";

  if (typeof timeValue === "string") {
    const parsedDate = parseISO(timeValue);
    if (isValid(parsedDate)) {
      return format(parsedDate, "HH:mm");
    }

    if (timeValue.length >= 5) {
      return timeValue.slice(0, 5);
    }
  }

  if (timeValue instanceof Date && isValid(timeValue)) {
    return format(timeValue, "HH:mm");
  }

  return String(timeValue);
}


export default formatTimeOnly;