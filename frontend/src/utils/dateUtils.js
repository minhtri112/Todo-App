import { startOfWeek, addDays, addWeeks, format, parseISO, isValid } from 'date-fns';

export const get7DaysOfWeek = (weekOffset = 3) => {
  const today = new Date();

  const mondayOfWeek = startOfWeek(addWeeks(today, weekOffset), { weekStartsOn: 1 });

  const dayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  return Array.from({ length: 7 }).map((_, index) => {
    const nextDay = addDays(mondayOfWeek, index);
    return {
      dayLabel: dayLabels[index],
      displayDate: format(nextDay, 'dd/MM/yyyy')
    };
  });
};


export const buildDateTimeValue = (dateValue, timeValue) => {
  if (!dateValue || !timeValue) {
    return "";
  }

  return `${dateValue}T${timeValue}:00`;
};

export const splitDateTime = (dateTimeValue) => {
  if (!dateTimeValue) {
    return { date: "", time: "" };
  }

  const parsedDate = parseISO(dateTimeValue);

  if (isValid(parsedDate)) {
    return {
      date: format(parsedDate, "yyyy-MM-dd"),
      time: format(parsedDate, "HH:mm"),
    };
  }

  if (typeof dateTimeValue === "string" && dateTimeValue.length >= 16) {
    return {
      date: dateTimeValue.slice(0, 10),
      time: dateTimeValue.slice(11, 16),
    };
  }

  return { date: "", time: "" };
};