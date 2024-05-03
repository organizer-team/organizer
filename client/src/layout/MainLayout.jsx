import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav/BottomNav';
import React from 'react';

export default function MainLayout() {
  return (
    <main>
      <p>Main Layout</p>
      <Outlet />
      <BottomNav />
    </main>
  );
}
