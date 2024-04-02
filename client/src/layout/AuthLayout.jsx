import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';

export default function AuthLayout() {
  return (
    <main>
      <Nav />
      <Outlet />
    </main>
  );
}
