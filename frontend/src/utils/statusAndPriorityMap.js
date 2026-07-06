const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "IN_PROGRESS", label: "Đang làm" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "OVERDUE", label: "Quá hạn" },
];

const priorityOptions = [
  { value: "", label: "Tất cả độ ưu tiên" },
  { value: "HIGH", label: "Cao" },
  { value: "MEDIUM", label: "Trung bình" },
  { value: "LOW", label: "Thấp" },
];

export { statusOptions, priorityOptions };
