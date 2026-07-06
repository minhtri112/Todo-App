import {
  statusBadgeClasses,
  priorityBadgeClasses,
  statusBorderClasses,
} from "../../utils/colorMap";
import formatTimeOnly from "../../utils/formatTime";
import todoService from "../../service/todoService";
import { toast } from "react-toastify";
import {X} from "lucide-react";
import { useState } from "react";


function ToDoItem({ todo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenEditModal = () => {
    window.dispatchEvent(
      new CustomEvent("openEditTodoModal", {
        detail: { todo },
      }),
    );
  };

  const handleDeleteTodo = async (event) => {
    event.stopPropagation();

    const shouldDelete = window.confirm(`Xóa công việc ${todo.title}?`);
    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await todoService.deleteTodo(todo.id);

      if (!response?.success) {
        throw new Error(response?.message || "Không thể xóa công việc.");
      }

      toast.success("Đã xóa công việc thành công.");
      window.dispatchEvent(new Event("todoListChanged"));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Không thể xóa công việc.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleOpenEditModal}
        className={`w-full rounded-lg border bg-white px-2 py-2 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md sm:px-3 ${statusBorderClasses[todo.status] || "border-slate-200"}`}
      >
        <div className="text-sm font-semibold leading-tight">{todo.title}</div>
        <div className="text-xs text-slate-600">
          {formatTimeOnly(todo.startTime)} - {formatTimeOnly(todo.endTime)}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] font-medium sm:text-[10px]">
          <span
            className={`inline-flex items-center justify-center rounded-full border px-1 py-0.5 ${statusBadgeClasses[todo.status] || "bg-slate-100 text-slate-700 border-slate-200"}`}
          >
            {todo.status}
          </span>
          <span
            className={`inline-flex items-center justify-center rounded-full border px-1 py-0.5 ${priorityBadgeClasses[todo.priority] || "bg-slate-100 text-slate-700 border-slate-200"}`}
          >
            {todo.priority}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={handleDeleteTodo}
        disabled={isDeleting}
        className="absolute -right-1 -top-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-500 opacity-0 shadow-sm transition hover:bg-rose-50 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60 sm:-right-2 sm:-top-2"
        aria-label="Xóa công việc"
      >
        {isDeleting ? <X className="h-4 w-4 animate-pulse" /> : <X  className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default ToDoItem;
