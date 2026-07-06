import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { parse, format } from "date-fns";
import { get7DaysOfWeek } from "../utils/dateUtils";
import todoService from "../service/todoService";
import ToDoItem from "../components/common/ToDoItem";
import { statusOptions, priorityOptions } from "../utils/statusAndPriorityMap";
import { toast } from "react-toastify";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDays, setWeekDays] = useState(get7DaysOfWeek(weekOffset));
  const [todoList, setTodoList] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const titleFilter = searchParams.get("title") ?? "";

  const sessionRows = ["Sáng", "Chiều", "Tối"];
  const sessionKeyMap = {
    Sáng: "MORNING",
    Chiều: "AFTERNOON",
    Tối: "EVENING",
  };
  const getIsoDateFromDisplayDate = (displayDate) =>
    format(parse(displayDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");

  const getSessionTodos = (day, session) => {
    const isoDate = getIsoDateFromDisplayDate(day.displayDate);
    const apiSessionKey = sessionKeyMap[session];
    return todoList?.[isoDate]?.[apiSessionKey] || [];
  };

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const data = await todoService.getTodosForCurrentWeek(
          weekOffset,
          statusFilter || undefined,
          priorityFilter || undefined,
          titleFilter || undefined,
        );
        console.log(data);
        if (data.success) {
          setTodoList(data?.data || {});
        }
      } catch (error) {
        toast.error(
          error?.message || "Đã xảy ra lỗi khi tải danh sách công việc.",
        );
      }
    };

    fetchTodoList();
  }, [weekOffset, statusFilter, priorityFilter, titleFilter]);

  useEffect(() => {
    const handleTodoListChanged = () => {
      const fetchTodoList = async () => {
        try {
          const data = await todoService.getTodosForCurrentWeek(
            weekOffset,
            statusFilter || undefined,
            priorityFilter || undefined,
            titleFilter || undefined,
          );

          if (data.success) {
            setTodoList(data?.data || {});
          }
        } catch (error) {
          toast.error(
            error?.message || "Đã xảy ra lỗi khi tải danh sách công việc.",
          );
        }
      };

      fetchTodoList();
    };

    window.addEventListener("todoListChanged", handleTodoListChanged);

    return () => {
      window.removeEventListener("todoListChanged", handleTodoListChanged);
    };
  }, [weekOffset, statusFilter, priorityFilter, titleFilter]);

  useEffect(() => {
    const updatedWeekDays = () => {
      setWeekDays(get7DaysOfWeek(weekOffset));
    };

    updatedWeekDays();
  }, [weekOffset]);

  const weekTitle =
    weekDays.length > 1
      ? `${weekDays[0].displayDate} - ${weekDays[6].displayDate}`
      : "Lịch tuần";

  return (
    <div className="rounded-lg p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Lịch làm việc</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:gap-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-md border bg-white px-4 py-2 text-sm font-medium sm:w-auto"
          >
            {statusOptions.map((option) => (
              <option key={option.value || "all-status"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full rounded-md border bg-white px-4 py-2 text-sm font-medium sm:w-auto"
          >
            {priorityOptions.map((option) => (
              <option key={option.value || "all-priority"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="flex-1 rounded-md border bg-white px-3 py-2 text-sm font-medium sm:flex-none"
          >
            Tuần trước
          </button>
          <button
            type="button"
            onClick={() => setWeekOffset(0)}
            className="flex-1 rounded-md border bg-white px-3 py-2 text-sm font-medium sm:flex-none"
          >
            Tuần này
          </button>
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="flex-1 rounded-md border bg-white px-3 py-2 text-sm font-medium sm:flex-none"
          >
            Tuần sau
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/70 px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">{weekTitle}</p>
        <p className="mt-1 text-sm text-slate-600">
          Click vào ngày để tạo công việc
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Click vào todo để chỉnh sửa hoặc xóa công việc
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-[900px] w-full border-collapse text-center text-sm md:text-base">
          <thead>
            <tr>
              <th className="w-24 border bg-white px-2 py-3 text-base font-bold md:px-3 md:text-lg">
                Buổi
              </th>
              {weekDays.map((day) => (
                <th
                  key={`${day.dayLabel}-${day.displayDate}`}
                  className="border bg-white px-2 py-3 md:px-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("openCreateTodoModal", {
                          detail: {
                            startDate: format(
                              parse(day.displayDate, "dd/MM/yyyy", new Date()),
                              "yyyy-MM-dd",
                            ),
                          },
                        }),
                      )
                    }
                    className="w-full rounded-md px-1 py-1 transition hover:bg-green-50"
                  >
                    <div className="text-sm font-bold leading-none md:text-lg">
                      {day.dayLabel}
                    </div>
                    <div className="mt-1 text-sm font-bold leading-none md:text-lg">
                      {day.displayDate}
                    </div>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sessionRows.map((session) => (
              <tr key={session} className="h-44">
                <th className="border bg-white px-2 py-2 text-sm font-semibold md:text-base">
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
                      ) : (
                        <></>
                      )}
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
