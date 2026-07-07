import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  console.log('AppRoutes rendered');
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      {/* Nếu gõ bậy bạ URL không khớp cái nào ở trên -> Vào trang 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;