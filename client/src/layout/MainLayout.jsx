import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav/BottomNav';

export default function MainLayout() {
  return (
    <main>
      <p>Main Layout</p>
      <Outlet />
      <BottomNav />
    </main>
  );
}
