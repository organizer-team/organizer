import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect } from 'react';
import getCookieValue from '../utils/getCookieValue';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [emailAfterValidation, setEmailAfterValidation] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(getCookieValue('token'));
  const [user, setUser] = useState({});

  useEffect(() => {}, [token]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        emailAfterValidation,
        setEmailAfterValidation,
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
