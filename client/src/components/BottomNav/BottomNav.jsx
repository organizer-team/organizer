import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrBladesVertical, GrAdd, GrCalendar, GrList } from 'react-icons/gr';

/* Styles */
const styles = {
  navButton: 'p-2 bg-blue-500 text-white',
  navContainer:
    'fixed bottom-0 w-full flex justify-center items-center bg-gray-200 p-4',
  navWrapper: 'w-full flex justify-center',
};

const routes = {
  calendar: '/calendar',
  tasks: '/tasks',
};

const iconSize = '1.5em';

export const BottomNav = ({ toggleLeftSideMenu }) => {
  const location = useLocation();
  const isCalendar = location.pathname === routes.calendar;

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <button onClick={toggleLeftSideMenu} className={styles.navButton}>
          <GrList size={iconSize} />
        </button>
        <button className={styles.navButton}>
          <GrAdd size={iconSize} />
        </button>
        {isCalendar ? (
          <Link to={routes.tasks} className={styles.navButton}>
            <GrBladesVertical size={iconSize} />
          </Link>
        ) : (
          <Link to={routes.calendar} className={styles.navButton}>
            <GrCalendar size={iconSize} />
          </Link>
        )}
      </div>
    </div>
  );
};
