/**
 * In this file we can create functions to mock results given by the backend
 */

// Mock of a successful getting of users
export const getUsersSuccessMock = (users = []) => {
  return JSON.stringify({ success: true, result: users });
};

// Mock of a successful getting of users
export const getUsersFailedMock = () => {
  return JSON.stringify({ success: false, message: 'Something went wrong' });
};

// Mock of a successful creation of a new user
export const createUserSuccessMock = (user = {}) => {
  return JSON.stringify({ success: true, user });
};

// Mock of a failing creation of a new user
export const createUserFailedMock = () => {
  return JSON.stringify({ success: false, message: 'Something went wrong' });
};

// Mock of a successful login
export const loginSuccessMock = () => {
  return JSON.stringify({ success: true });
};

// Mock of a failing login
export const loginFailedMock = () => {
  return JSON.stringify({ success: false, message: 'Failed to log in' });
};

// Mock of a failing validation of a new user
export const createUserFailedValidationMock = (user) => {
  if (user.userName.length < 1) {
    return JSON.stringify({
      success: false,
      message: 'Name is a required field',
    });
  }
  if (user.password.length < 1) {
    return JSON.stringify({
      success: false,
      message: 'Password is a required field',
    });
  }
  if (user.confirmPassword.length < 1) {
    return JSON.stringify({
      success: false,
      message: 'Confirm password is a required field',
    });
  }
  if (user.confirmEmail !== user.password) {
    return JSON.stringify({
      success: false,
      message: 'Passwords do not match',
    });
  }
};
