import React, { useState, useEffect } from 'react';
import TEST_ID from './Home.testid';
import useFetch from '../../hooks/useFetch';
import LogOutButton from '../../components/LogOutButtons/LogOutButton';
import LogOutButtonGuest from '../../components/LogOutButtons/LogOutButtonGuest';

/* Styles */
const HOME_PAGE = 'p-2 my-2';

function Home() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});

  const { cancelFetch: profileCancelFetch, performFetch: profilePerformFetch } =
    useFetch('/user/profile/', (jsonResult) => {
      if (jsonResult.success) {
        setUserId(jsonResult.user.id);
      } else {
        alert('Failed to fetch user');
      }
    });
  const { cancelFetch: getUserCancelFetch, performFetch: getUserPerformFetch } =
    useFetch(`/user/${userId}`, (jsonResult) => {
      if (jsonResult.success) {
        setUser({ ...jsonResult.result });
      } else {
        alert('Failed to fetch user');
      }
    });

  useEffect(() => {
    getUserId();
    return profileCancelFetch;
  }, []);
  useEffect(() => {
    getUser();
    return getUserCancelFetch;
  }, [userId]);

  function getUserId() {
    profilePerformFetch({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include', // save cookies inside react app
    });
  }

  function getUser() {
    getUserPerformFetch({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return (
    <div data-testid={TEST_ID.container} className={HOME_PAGE}>
      <h1>Homepage</h1>
      <p>This is it!</p>
      <p>{user.userName}</p>
      <p>{user.email}</p>
      {/*temporary log out button */}
      {user.userName?.startsWith('OrganizerGuest2024') ? (
        <LogOutButtonGuest userId={userId} />
      ) : (
        <LogOutButton />
      )}
    </div>
  );
}

export default Home;
