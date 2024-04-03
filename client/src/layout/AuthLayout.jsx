import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import React from 'react';

export default function AuthLayout() {
  return (
    <main>
      <Nav />
      <Outlet />
    </main>
  );
}
