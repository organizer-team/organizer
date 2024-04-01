import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main>
      <p>Main Layout</p>
      <Outlet />
    </main>
  );
}
