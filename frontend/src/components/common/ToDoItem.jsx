import {
  statusBadgeClasses,
  priorityBadgeClasses,
  statusBorderClasses,
} from "../../utils/colorMap";
function ToDoItem({ todo }) {
  return (
    <>
      <div
        key={todo.id}
        className={`rounded-lg border bg-white px-3 py-2 shadow-sm ${statusBorderClasses[todo.status] || "border-slate-200"}`}
      >
        <div className="text-sm font-semibold">{todo.title}</div>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium">
          <span
            className={`rounded-full border px-2 py-0.5 ${statusBadgeClasses[todo.status] || "bg-slate-100 text-slate-700 border-slate-200"}`}
          >
            {todo.status}
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 ${priorityBadgeClasses[todo.priority] || "bg-slate-100 text-slate-700 border-slate-200"}`}
          >
            {todo.priority}
          </span>
        </div>
      </div>
    </>
  );
}

export default ToDoItem;
