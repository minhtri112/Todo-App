import { startOfWeek, addDays, addWeeks, format } from 'date-fns';

export const get7DaysOfWeek = (weekOffset = 3) => {
  const today = new Date();
  
  // 1. Tìm ngày Thứ 2 của tuần dựa theo số tuần lệch (weekStartsOn: 1 là Thứ 2)
  const mondayOfWeek = startOfWeek(addWeeks(today, weekOffset), { weekStartsOn: 1 });

  // Mảng nhãn Thứ bằng tiếng Việt
  const dayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  // 2. Vòng lặp map sinh ra đầy đủ thông tin cho 7 ngày
  return Array.from({ length: 7 }).map((_, index) => {
    const nextDay = addDays(mondayOfWeek, index);
    return {
      dayLabel: dayLabels[index],          
      displayDate: format(nextDay, 'dd/MM/yyyy')  
    };
  });
};