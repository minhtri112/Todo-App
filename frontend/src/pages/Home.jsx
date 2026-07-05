import { useEffect, useState } from 'react';
import { parse, format } from 'date-fns';
import { get7DaysOfWeek } from '../utils/dateUtils';
import todoService from '../service/todoService';
import ToDoItem from '../components/common/ToDoItem';

export default function Home() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDays, setWeekDays] = useState(get7DaysOfWeek(weekOffset));
  const [todoList, setTodoList] = useState({});
  const sessionRows = ['Sáng', 'Chiều', 'Tối'];
 
  const sessionKeyMap = {
    Sáng: 'MORNING',
    Chiều: 'AFTERNOON',
    Tối: 'EVENING',
  };

  const getIsoDateFromDisplayDate = (displayDate) =>
    format(parse(displayDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

  const getSessionTodos = (day, session) => {
    const isoDate = getIsoDateFromDisplayDate(day.displayDate);
    const apiSessionKey = sessionKeyMap[session];
    return todoList?.[isoDate]?.[apiSessionKey] || [];
  };

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const data = await todoService.getTodosForCurrentWeek(weekOffset);
        setTodoList(data?.data ?? data ?? {});
      } catch (error) {
        console.error('Error fetching todos for the current week:', error);
      }
    };

    fetchTodoList();
  }, [weekOffset]);

  useEffect(() => {
    const updatedWeekDays = () => {
      setWeekDays(get7DaysOfWeek(weekOffset));
    };

    updatedWeekDays();
  }, [weekOffset]);

  const weekTitle =
    weekDays.length > 1
      ? `${weekDays[0].displayDate} - ${weekDays[6].displayDate}`
      : 'Lịch tuần';


  console.log('Todo List for the current week:', todoList);

  return (
    <div className="p-4 md:p-6 rounded-lg">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg md:text-xl font-semibold">Lịch làm việc</h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
          >
            Tuần trước
          </button>
          <button
            type="button"
            onClick={() => setWeekOffset(0)}
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
          >
            Tuần này
          </button>
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
          >
            Tuần sau
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm">{weekTitle}</p>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-[900px] w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="w-24 border bg-white px-3 py-3 text-lg font-bold">
                Buổi
              </th>
              {weekDays.map((day) => (
                <th
                  key={`${day.dayLabel}-${day.displayDate}`}
                  className="border bg-white px-4 py-3"
                >
                  <div className="text-lg leading-none font-bold">{day.dayLabel}</div>
                  <div className="mt-1 text-lg leading-none font-bold">{day.displayDate}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sessionRows.map((session) => (
              <tr key={session} className="h-44">
                <th className="border bg-white px-2 py-2 font-semibold">
                  {session}
                </th>
                {weekDays.map((day) => (
                  <td
                    key={`${session}-${day.dayLabel}-${day.displayDate}`}
                    className="border align-top"
                  >
                    <div className="flex min-h-44 flex-col gap-2 p-2 text-left">
                      {getSessionTodos(day, session).length > 0 ? (
                        getSessionTodos(day, session).map((todo) => (
                          <ToDoItem key={todo.id} todo={todo} />
                        ))
                      ) : (<></>)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}