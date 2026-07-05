const statusBadgeClasses = {
  COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CANCELED: "bg-rose-100 text-rose-700 border-rose-200",
};
const statusBorderClasses = {
  COMPLETED: "border-emerald-300",
  IN_PROGRESS: "border-blue-300",
  PENDING: "border-amber-300",
  CANCELED: "border-rose-300",
};
const priorityBadgeClasses = {
  HIGH: "bg-rose-100 text-rose-700 border-rose-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-sky-100 text-sky-700 border-sky-200",
};

export { statusBadgeClasses, statusBorderClasses, priorityBadgeClasses };
