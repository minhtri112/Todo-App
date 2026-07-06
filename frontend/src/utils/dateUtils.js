import { startOfWeek, addDays, addWeeks, format } from 'date-fns';

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