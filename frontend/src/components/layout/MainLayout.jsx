import { useSearchParams, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CreateTodoModal from '../common/CreateTodoModal';
function MainLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("title") || "");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalInitialStartDate, setModalInitialStartDate] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const updateInputValue = () => {
      setInputValue(searchParams.get("title") || "");
    };
    updateInputValue();
  }, [searchParams]);

  useEffect(() => {
    const handleOpenCreateTodoModal = (event) => {
      setSelectedTodo(null);
      setModalInitialStartDate(event?.detail?.startDate || "");
      setIsCreateModalOpen(true);
    };

    const handleOpenEditTodoModal = (event) => {
      setSelectedTodo(event?.detail?.todo || null);
      setModalInitialStartDate("");
      setIsCreateModalOpen(true);
    };

    window.addEventListener('openCreateTodoModal', handleOpenCreateTodoModal);
    window.addEventListener('openEditTodoModal', handleOpenEditTodoModal);

    return () => {
      window.removeEventListener('openCreateTodoModal', handleOpenCreateTodoModal);
      window.removeEventListener('openEditTodoModal', handleOpenEditTodoModal);
    };
  }, []);

  const handleTitleSearchChange = (e) => {
    const nextValue = e.target.value;
    setInputValue(nextValue);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);

      if (nextValue) {
        nextParams.set("title", nextValue);
      } else {
        nextParams.delete("title");
      }

      setSearchParams(nextParams, { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 md:px-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div className="w-[80%] flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 xl:gap-16">
          <h1 className="text-xl font-bold text-green-600">Alpha Todo App</h1>
          <div className="flex w-full max-w-2xl flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleTitleSearchChange}
              placeholder="Tìm theo tiêu đề..."
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full rounded-md bg-green-400 px-4 py-2 font-medium text-black sm:w-auto"
          >
            + Thêm mới
          </button>
        </div>
      </nav>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>

      <CreateTodoModal
        open={isCreateModalOpen}
        onOpenChange={(nextOpen) => {
          setIsCreateModalOpen(nextOpen);
          if (!nextOpen) {
            setSelectedTodo(null);
            setModalInitialStartDate("");
          }
        }}
        initialStartDate={modalInitialStartDate}
        todoToEdit={selectedTodo}
      />
    </div>
  );
}

export default MainLayout;
