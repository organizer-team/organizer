import React from 'react';
import { MemoryRouter } from 'react-router-dom';

/**
 * We use the App component to test here as it will do the routing for us.
 * This allows our test to be more user centric!
 */
import App from '../../../../App.jsx';

import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import CreateUser from '../CreateUser.jsx';
import TEST_ID_CREATE_USER from '../CreateUser.testid.js';
import {
  createUserSuccessMock,
  createUserFailedMock,
} from '../../../../__testUtils__/fetchUserMocks';

// Remove the mock for BrowserRouter
beforeEach(() => {
  fetch.resetMocks();
});

// Mock UserContext module
// jest.mock('../../../../context/UserContext.jsx', () => ({
//   UserContext: {
//     Provider: ({ children }) => <div>{children}</div>,
//     Consumer: ({ children }) => children({}),
//   },
// }));

describe('CreateUser', () => {
  it('Renders without a problem', () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.container)
    ).toBeInTheDocument();
  });

  it('Should be able to change user name, password and confirm password input', () => {
    const testUserName = 'John Smith';
    const testPassword = 'John';
    const testPasswordConfirm = 'John';
    const testEmail = 'test@example.com';

    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    // Check initially fields are empty
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      ''
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      ''
    );
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput).value
    ).toEqual('');

    // Change fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });
    fireEvent.change(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
      {
        target: { value: testPasswordConfirm },
      }
    );

    // Check fields have changed value
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      testUserName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput).value
    ).toEqual(testPasswordConfirm);
  });

  it('Should send the input values to the server on clicking submit and indicate loading states', async () => {
    const testUserName = 'John Smith';
    const testPassword = 'John';
    const testPasswordConfirm = 'John';
    const testEmail = 'test@example.com';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserSuccessMock({
        userName: testUserName,
        password: testPassword,
        email: testEmail,
      })
    );

    render(
      <MemoryRouter history={history} initialEntries={['/user/signup']}>
        <CreateUser />
      </MemoryRouter>
    );

    // Fill in our fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });
    fireEvent.change(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
      {
        target: { value: testPasswordConfirm },
      }
    );

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Check that there is no loading indicator initially
    expect(
      await screen.queryByTestId(TEST_ID_CREATE_USER.loadingContainer)
    ).not.toBeInTheDocument();

    // Click submit
    fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton));

    // Wait for the loading to be shown
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.loadingContainer)
    ).toBeInTheDocument();

    // Wait for the loading state to be removed
    await waitForElementToBeRemoved(
      screen.getByTestId(TEST_ID_CREATE_USER.loadingContainer)
    );

    // Check that the right endpoint was called
    expect(fetch.mock.calls[0][0]).toContain('api/user/register');
    // Check the right data is given. We need the second argument ([1]) of the first call ([0])
    expect(fetch.mock.calls[0][1].body).toEqual(
      // We need to stringify as we send the information as a string
      JSON.stringify({
        user: {
          userName: testUserName,
          password: testPassword,
          email: testEmail,
        },
      })
    );
  });

  it('Should show an error state if the creation is unsuccessful', async () => {
    const testUserName = 'John Doe';
    const testPassword = 'John';
    const testPasswordConfirm = 'John';
    const testEmail = 'test@example.com';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserFailedMock({
        userName: testUserName,
        password: testPassword,
        email: testEmail,
      })
    );

    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    // Fill in our fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });
    fireEvent.change(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
      {
        target: { value: testPasswordConfirm },
      }
    );

    // Check that there is no error indicator initially
    expect(
      screen.queryByTestId(TEST_ID_CREATE_USER.errorContainer)
    ).not.toBeInTheDocument();

    // Click submit
    fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton));

    // Wait to see the error component
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check to see that the fields are still filled in
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      testUserName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput).value
    ).toEqual(testPasswordConfirm);
  });
});
