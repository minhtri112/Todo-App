import { Link, Outlet } from 'react-router-dom';
function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">Alpha Todo App</h1>
        <div className="space-x-4">
          <Link to="/create" className="text-gray-600 hover:text-green-600 font-medium">+ Thêm mới</Link>
        </div>
      </nav>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet /> 
      </main>
    </div>
  );
}

export default MainLayout;