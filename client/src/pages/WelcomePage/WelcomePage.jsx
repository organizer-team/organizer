import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import TEST_ID from './WelcomePage.testid';
import useFetch from '../../hooks/useFetch';
import getCookieValue from '../../utils/getCookieValue';
import { UserContext } from '../../context/UserContext';

const styles = {
  CONTAINER:
    'flex flex-col items-center justify-center min-h-screen p-4 bg-organizerGray-light',
  TITLE: 'text-3xl font-bold text-organizerPurple-primary mb-4',
  TEXT: 'text-lg text-center text-organizerGray-dark mb-4',
  LINK: 'text-organizerPurple-light hover:underline',
  BUTTON:
    'w-full py-2 rounded mt-4 focus:outline-none',
  GREEN_BUTTON: 'bg-organizerGreen-primary text-white',
  BLUE_BUTTON: 'bg-organizerBlue-primary text-white',
};

const WelcomePage = () => {
  const { setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const { cancelFetch, performFetch } = useFetch('/user/register', (jsonResult) => {
    if (jsonResult.success) {
      setRedirect(true);
      setToken(getCookieValue('token'));
    } else {
      alert('Sign up failed');
    }
  });

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleGuestClick = () => {
    const guestName = `OrganizerGuest2024${new Date().valueOf()}`;
    performFetch({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: { userName: guestName, password: 'qweQWE123!', email: `${guestName}@guestEmail.com` } }),
      credentials: 'include', // save cookies inside react app
    });
  };

  return (
    <div data-testid={TEST_ID.container} className={styles.CONTAINER}>
      {redirect && <Navigate to={'/'} />}
      <h1 className={styles.TITLE}>Welcome to Organizer!</h1>
      <p className={styles.TEXT}>This is the welcome page of our app.</p>
      <Link to={'/email-validation'} className={`${styles.BUTTON} ${styles.GREEN_BUTTON}`}>
        Continue as a user
      </Link>
      <button onClick={handleGuestClick} className={`${styles.BUTTON} ${styles.BLUE_BUTTON}`}>
        Continue as a guest
      </button>
    </div>
  );
};

export default WelcomePage;
