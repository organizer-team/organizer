import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import useFetch from '../../../hooks/useFetch';
import CredentialsInput from '../../../components/CredentialsInput/CredentialsInput';
import getCookieValue from '../../../utils/getCookieValue';

import TEST_ID from './LoginPage.testid';

/* Styles */
const styles = {
  CONTAINER:
    'flex flex-col items-center justify-center min-h-screen p-4 bg-organizerGray-light',
  FORM: 'flex flex-col w-full max-w-md p-4 rounded gap-4',
  SUBMIT_BUTTON: 'w-full py-2 bg-purple-600 text-white rounded',
  LINK: 'text-organizerPurple-light hover:underline',
  STATUS_CONTAINER: 'mt-4 text-red-500',
};

export default function LoginPage({ emailAfterValidation }) {
  const { setToken, setUser } = useContext(UserContext);

  const [email, setEmail] = useState(emailAfterValidation);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    '/user/login',
    (jsonResult) => {
      if (jsonResult.success) {
        setRedirect(true);
        setToken(getCookieValue('token'));
        setUser(jsonResult.user);
      } else {
        alert('Login failed');
      }
    }
  );

  async function login(event) {
    if (event) {
      event.preventDefault();
    }
    performFetch({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
      credentials: 'include', // save cookies inside react app
    });
  }

  useEffect(() => {
    setEmail(emailAfterValidation);
    return cancelFetch;
  }, []);

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div
        data-testid={TEST_ID.errorContainer}
        className={styles.STATUS_CONTAINER}
      >
        {error}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div
        data-testid={TEST_ID.loadingContainer}
        className={styles.STATUS_CONTAINER}
      >
        Logging in...
      </div>
    );
  }

  let buttonComponent = null;
  if (!isLoading) {
    buttonComponent = (
      <button
        data-testid={TEST_ID.loginButton}
        onClick={login}
        className={styles.SUBMIT_BUTTON}
      >
        Let me in!
      </button>
    );
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.CONTAINER} data-testid={TEST_ID.container}>
      {redirect && <Navigate to={'/'} />}
      <form data-testid={TEST_ID.form} className={styles.FORM}>
        <h1 className="text-xl font-bold">Login</h1>
        <div
          className="text-organizerPurple-primary"
          data-testid={TEST_ID.emailInput}
        >
          {' '}
          {email}
        </div>
        <div className="text-red-400">
          This is not your email?{' '}
          <Link className={styles.LINK} to={'../../email-validation'}>
            Go Back
          </Link>{' '}
        </div>
        <CredentialsInput
          data-testid={TEST_ID.passwordInput}
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {buttonComponent}
      </form>
      {statusComponent}
    </div>
  );
}

LoginPage.propTypes = {
  emailAfterValidation: PropTypes.string,
};
