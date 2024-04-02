import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrBladesVertical, GrAdd, GrCalendar, GrList } from 'react-icons/gr';
import PropTypes from 'prop-types';

/* Styles */
const styles = {
  navButton: 'p-2 bg-blue-500 text-white',
  navContainer:
    'fixed bottom-0 w-full flex justify-center items-center bg-gray-200 p-4',
  navWrapper: 'w-full flex justify-center',
  popupButton: 'w-full bg-green-500 text-white rounded p-2 mb-2',
  popupMenu: 'absolute bottom-full mb-2 w-32 bg-white shadow-lg rounded-lg p-2',
};

const routes = {
  calendar: '/calendar',
  tasks: '/tasks',
};

const iconSize = '1.5em';

export const BottomNav = ({ toggleLeftSideMenu }) => {
  const location = useLocation();
  const isCalendar = location.pathname === routes.calendar;

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <button onClick={toggleLeftSideMenu} className={styles.navButton}>
          <GrList size={iconSize} />
        </button>
        <button onClick={togglePopup} className={styles.navButton}>
          <GrAdd size={iconSize} />
        </button>
        {showPopup && (
          <div className={styles.popupMenu}>
            <button onClick={togglePopup} className={styles.popupButton}>
              Task
            </button>
            <button onClick={togglePopup} className={styles.popupButton}>
              Event
            </button>
          </div>
        )}
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

// Props

BottomNav.propTypes = {
  toggleLeftSideMenu: PropTypes.func.isRequired,
};
