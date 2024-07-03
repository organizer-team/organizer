import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserContext';

// Mock UserContext provider
const mockSetToken = jest.fn();
const MockUserProvider = ({ children, emailAfterValidation = '' }) => (
  <UserContext.Provider
    value={{ emailAfterValidation, setToken: mockSetToken }}
  >
    {children}
  </UserContext.Provider>
);

// Define propTypes for MockUserProvider
MockUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  emailAfterValidation: PropTypes.string,
};

export default MockUserProvider;
