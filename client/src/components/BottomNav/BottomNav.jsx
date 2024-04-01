import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrBladesVertical, GrAdd, GrCalendar, GrList } from 'react-icons/gr';

export const BottomNav = ({ toggleLeftSideMenu }) => {
  const location = useLocation();
  const isCalendar = location.pathname === '/calendar';

  return (
    <div className="fixed bottom-0 w-full flex justify-center items-center bg-gray-200 p-4">
      <button
        onClick={toggleLeftSideMenu}
        className="p-2 bg-blue-500 text-white"
      >
        <GrList />
      </button>
      <button className="p-2 bg-blue-500 text-white">
        <GrAdd />
      </button>
      {isCalendar ? (
        <Link to="/tasks" className="p-2 bg-blue-500 text-white">
          <GrBladesVertical />
        </Link>
      ) : (
        <Link to="/calendar" className="p-2 bg-blue-500 text-white">
          <GrCalendar />
        </Link>
      )}
    </div>
  );
};
