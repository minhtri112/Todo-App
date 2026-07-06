import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import todoService from "../../service/todoService";
import {
  priorityOptions,
  statusOptions,
} from "../../utils/statusAndPriorityMap";
import { X } from "lucide-react";
import { buildDateTimeValue, splitDateTime } from "../../utils/dateUtils";

const initialFormState = {
  title: "",
  description: "",
  status: "PENDING",
  priority: "MEDIUM",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
};



function CreateTodoModal({
  open,
  onOpenChange,
  initialStartDate = "",
  todoToEdit = null,
}) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modalStatusOptions = useMemo(
    () => statusOptions.filter((option) => option.value),
    [],
  );

  const modalPriorityOptions = useMemo(
    () => priorityOptions.filter((option) => option.value),
    [],
  );

  useEffect(() => {
    const resetForm = () => {
      if (!open) {
        setFormData(initialFormState);
        setErrorMessage("");
        setIsSubmitting(false);
      }
    };
    resetForm();
  }, [open]);

  useEffect(() => {
    const populateFormForEdit = () => {
      if (!open) {
        return;
      }

      if (todoToEdit) {
        const start = splitDateTime(todoToEdit.startTime);
        const end = splitDateTime(todoToEdit.endTime);

        setFormData({
          title: todoToEdit.title || "",
          description: todoToEdit.description || "",
          status: todoToEdit.status || "PENDING",
          priority: todoToEdit.priority || "MEDIUM",
          startDate: start.date,
          startTime: start.time,
          endDate: end.date,
          endTime: end.time,
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        startDate: initialStartDate || prev.startDate,
      }));
    };
    populateFormForEdit();
  }, [open, initialStartDate, todoToEdit]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();
    const startTime = buildDateTimeValue(
      formData.startDate,
      formData.startTime,
    );
    const endTime = buildDateTimeValue(formData.endDate, formData.endTime);

    if (!trimmedTitle) {
      setErrorMessage("Vui lòng nhập tiêu đề công việc.");
      return;
    }

    if (!startTime || !endTime) {
      setErrorMessage("Vui lòng chọn đầy đủ ngày và giờ bắt đầu/kết thúc.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        title: trimmedTitle,
        description: trimmedDescription || null,
        status: formData.status,
        priority: formData.priority,
        startTime,
        endTime,
      };

      const response = todoToEdit?.id
        ? await todoService.editTodo(todoToEdit.id, payload)
        : await todoService.createTodo(payload);

      if (!response?.success) {
        throw new Error(
          response?.message ||
          (todoToEdit?.id
            ? "Không thể cập nhật công việc."
            : "Không thể tạo công việc mới."),
        );
      }

      toast.success(
        todoToEdit?.id
          ? "Đã cập nhật công việc thành công."
          : "Đã tạo công việc mới thành công.",
      );
      onOpenChange(false);
      window.dispatchEvent(new Event("todoListChanged"));
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        (todoToEdit?.id
          ? "Không thể cập nhật công việc."
          : "Không thể tạo công việc mới.");
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-3 py-3 sm:items-center sm:px-4">
      <button
        type="button"
        aria-label="Đóng modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {todoToEdit?.id ? "Cập nhật công việc" : "Tạo công việc mới"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {todoToEdit?.id
                ? "Chỉnh sửa thông tin rồi lưu để cập nhật todo."
                : "Nhập đầy đủ thông tin để thêm todo vào lịch."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Đóng"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tiêu đề
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ví dụ: Họp team, viết báo cáo..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả ngắn cho công việc..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
              {todoToEdit?.id ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  {modalStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  readOnly
                  value="Đang chờ (PENDING)"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Độ ưu tiên
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                {modalPriorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Giờ bắt đầu
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Ngày kết thúc
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Giờ kết thúc
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting
                ? "Đang lưu..."
                : todoToEdit?.id
                  ? "Lưu thay đổi"
                  : "Tạo công việc"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodoModal;
