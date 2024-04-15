import React, {useEffect, useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import TEST_ID from './WelcomePage.testid';
import useFetch from '../../hooks/useFetch';
import getCookieValue from '../../utils/getCookieValue';
import { UserContext } from '../../context/UserContext';

const styles = {
  CONTAINER:
    'flex flex-col items-center justify-center min-h-screen p-4 bg-organizerGray-light',
  FORM: 'flex flex-col w-full max-w-md p-4 rounded gap-4',
  PASSWORD_CONTAINER: 'flex flex-row items-center justify-center gap-2',
  INFO_BUTTON:
    'bg-green-500 w-6 h-6 text-white rounded-full flex items-center justify-center',
  SUBMIT_BUTTON: 'w-full py-2 bg-purple-600 text-white rounded',
  LINK: 'text-organizerPurple-light hover:underline',
  STATUS_CONTAINER: 'mt-4 text-red-500',
};

const WelcomePage = () => {
  const { setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const {cancelFetch, performFetch} = useFetch(
    '/user/register',
    (jsonResult) => {
      if (jsonResult.success) {
        setRedirect(true);
        setToken(getCookieValue('token'));
      } else {
        alert('Sign up failed');
      }
    }
  );

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
      body: JSON.stringify({ user: { userName:guestName, password:'qweQWE123!', email:`${guestName}@guestEmail.com`} }),
      credentials: 'include', // save cookies inside react app
    });
  }


  return (
    <div data-testid={TEST_ID.container} className={styles.CONTAINER}>
      {redirect && <Navigate to={'/'} />}
      <h1>Welcome to the App!</h1>
      <p>This is the welcome page of our app.</p>
      <Link to={'/email-validation'}>Continue as a user</Link>
      <button onClick={handleGuestClick}>Continue as a guest</button>
    </div>
  )
}

export default WelcomePage