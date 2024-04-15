import React, { useContext, useState, useEffect } from 'react';
import TEST_ID from './Home.testid';
import { UserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import removeTokenCookie from '../../utils/removeToken';

/* Styles */
const HOME_PAGE = 'p-2 my-2';

function Home() {
  const { setToken } = useContext(UserContext);
  const [user, setUser] = useState({})

  const {
    cancelFetch: profileCancelFetch, 
    performFetch: profilePerformFetch
  } = useFetch('/user/profile/', (jsonResult) => {
      if (jsonResult.success) {
        setUser({...jsonResult.user});
      } else {
        alert('Failed to fetch user');
      }
    }
  );

  useEffect(() => {
    getUser();
    return profileCancelFetch;
  }, []);

  async function getUser() {
    profilePerformFetch({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include', // save cookies inside react app
    });
  }


  return (
    <div data-testid={TEST_ID.container} className={HOME_PAGE}>
      <h1>Homepage</h1>
      <p>This is it!</p>
      <p>{user.id}</p>
      {/* temporary log out button */}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          removeTokenCookie();
          setToken(null);
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Home;
