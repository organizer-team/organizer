import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { UserContext } from '../../../context/UserContext';
import CredentialsInput from '../../../components/CredentialsInput/CredentialsInput';
import useFetch from '../../../hooks/useFetch';
import TEST_ID from './CreateUser.testid';

/* Styles */
const styles = {
  CONTAINER:
    'flex flex-col items-center justify-center min-h-screen p-4 bg-[#F2F2F2]',
  FORM: 'flex flex-col w-full max-w-md p-4 rounded gap-4',
  SUBMIT_BUTTON: 'w-full py-2 bg-purple-600 text-white rounded',
  LINK: 'text-[#B580FF] hover:underline',
  STATUS_CONTAINER: 'mt-4 text-red-500',
};

const CreateUser = () => {
  const { emailAfterValidation } = useContext(UserContext);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onSuccess = () => {
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setRedirect(true);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    '/user/register',
    onSuccess
  );

  useEffect(() => {
    setEmail(emailAfterValidation);
    return cancelFetch;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    performFetch({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: { userName, password, email } }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div
        data-testid={TEST_ID.errorContainer}
        className={styles.STATUS_CONTAINER}
      >
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div
        data-testid={TEST_ID.loadingContainer}
        className={styles.STATUS_CONTAINER}
      >
        Creating user....
      </div>
    );
  }

  // const handleEmailChange = event => {
  //   setEmail(event.target.value);
  // };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div data-testid={TEST_ID.container} className={styles.CONTAINER}>
      {redirect && <Navigate to={'/user/list'} />}
      <form onSubmit={handleSubmit} className={styles.FORM}>
        <h1 className="text-xl font-bold mb-4">Sign up</h1>
        <div className="text-[#B580FF] mb-4">{email}</div>
        <div className="text-red-400 mb-2">
          This is not your email?{' '}
          <Link className={styles.LINK} to={'../../email-validation'}>
            Go Back
          </Link>{' '}
        </div>
        <CredentialsInput
          name="userName"
          placeholder="Enter your name"
          value={userName}
          onChange={handleUserNameChange}
          data-testid={TEST_ID.userNameInput}
        />
        <CredentialsInput
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          data-testid={TEST_ID.passwordInput}
        />
        <CredentialsInput
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          data-testid={TEST_ID.confirmPasswordInput}
        />
        <button
          type="submit"
          data-testid={TEST_ID.submitButton}
          className={styles.SUBMIT_BUTTON}
        >
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateUser;
