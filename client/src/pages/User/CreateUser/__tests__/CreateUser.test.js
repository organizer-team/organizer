import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';

import CreateUser from '../CreateUser';
import MockUserProvider from '../../../../__testUtils__/mockUserProvider.js';
import TEST_ID_CREATE_USER from '../CreateUser.testid.js';
import {
  createUserSuccessMock,
  createUserFailedMock,
  createUserFailedValidationMock,
} from '../../../../__testUtils__/fetchUserMocks';

beforeEach(() => {
  fetch.resetMocks();
});

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

  it('Should be able to change user name, password and confirm password', async () => {
    const testUserName = 'John';
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = 'johnJOHN123!';

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
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Check fields have changed value
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      testUserName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput).value
    ).toEqual(testConfirmPassword);
  });

  it('Should send the input values to the server on clicking submit and indicate loading states', async () => {
    const testUserName = 'John';
    const testEmail = 'john@gmail.com';
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = 'johnJOHN123!';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserSuccessMock({
        userName: testUserName,
        password: testPassword,
        email: testEmail,
        confirmPassword: testConfirmPassword,
      })
    );

    render(
      <MemoryRouter>
        <MockUserProvider emailAfterValidation={testEmail}>
          <CreateUser />
        </MockUserProvider>
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Check that there is no loading indicator initially
    expect(
      await screen.queryByTestId(TEST_ID_CREATE_USER.loadingContainer)
    ).not.toBeInTheDocument();

    // Click submit
    await act(async () =>
      fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton))
    );

    // Wait for the loading to be shown
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.loadingContainer)
      ).toBeInTheDocument()
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
          confirmPassword: testConfirmPassword,
          email: testEmail,
        },
      })
    );
  });

  it('Should show an error state if the creation is unsuccessful', async () => {
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = 'johnJOHN123!';

    // Mock our fetch
    fetch.mockResponseOnce(createUserFailedMock());

    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });
    fireEvent.change(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
      {
        target: { value: testConfirmPassword },
      }
    );

    // Wait to see the error component
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check to see that the fields are still filled in
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput).value
    ).toEqual(testConfirmPassword);
  });

  it('Should display server error if the name field is empty', async () => {
    const testUserName = '';
    const testEmail = 'john@gmail.com';
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = 'johnJOHN123!';
    const testError = 'Name is a required field';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserFailedValidationMock({
        userName: testUserName,
        email: testEmail,
        confirmPassword: testConfirmPassword,
        password: testPassword,
      })
    );

    render(
      <MemoryRouter>
        <MockUserProvider emailAfterValidation={testEmail}>
          <CreateUser />
        </MockUserProvider>
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Click submit
    await act(async () =>
      fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton))
    );

    // Wait for the error to be shown
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check that the error message is displayed and it is valid
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.errorContainer).textContent
    ).toEqual(testError);
  });

  it('Should display server error if the password field is empty', async () => {
    const testUserName = 'John';
    const testEmail = 'john@gmail.com';
    const testPassword = '';
    const testConfirmPassword = 'johnJOHN123!';
    const testError = 'Password is a required field';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserFailedValidationMock({
        userName: testUserName,
        email: testEmail,
        confirmPassword: testConfirmPassword,
        password: testPassword,
      })
    );

    render(
      <MemoryRouter>
        <MockUserProvider emailAfterValidation={testEmail}>
          <CreateUser />
        </MockUserProvider>
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Click submit
    await act(async () =>
      fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton))
    );

    // Wait for the error to be shown
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check that the error message is displayed and it is valid
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.errorContainer).textContent
    ).toEqual(testError);
  });

  it('Should display server error if the confirm password field is empty', async () => {
    const testUserName = 'John';
    const testEmail = 'john@gmail.com';
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = '';
    const testError = 'Confirm password is a required field';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserFailedValidationMock({
        userName: testUserName,
        email: testEmail,
        confirmPassword: testConfirmPassword,
        password: testPassword,
      })
    );

    render(
      <MemoryRouter>
        <MockUserProvider emailAfterValidation={testEmail}>
          <CreateUser />
        </MockUserProvider>
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Click submit
    await act(async () =>
      fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton))
    );

    // Wait for the error to be shown
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check that the error message is displayed and it is valid
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.errorContainer).textContent
    ).toEqual(testError);
  });

  it('Should display server error if the password and the confirm password do not match', async () => {
    const testUserName = 'John';
    const testEmail = 'john@gmail.com';
    const testPassword = 'johnJOHN123!';
    const testConfirmPassword = 'john';
    const testError = 'Passwords do not match';

    // Mock our fetch
    fetch.mockResponseOnce(
      createUserFailedValidationMock({
        userName: testUserName,
        email: testEmail,
        confirmPassword: testConfirmPassword,
        password: testPassword,
      })
    );

    render(
      <MemoryRouter>
        <MockUserProvider emailAfterValidation={testEmail}>
          <CreateUser />
        </MockUserProvider>
      </MemoryRouter>
    );

    // Fill in our fields
    await act(async () => {
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
        target: { value: testUserName },
      });
      fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
        target: { value: testPassword },
      });
      fireEvent.change(
        screen.getByTestId(TEST_ID_CREATE_USER.confirmPasswordInput),
        {
          target: { value: testConfirmPassword },
        }
      );
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Click submit
    await act(async () =>
      fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton))
    );

    // Wait for the error to be shown
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check that the error message is displayed and it is valid
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.errorContainer).textContent
    ).toEqual(testError);
  });
});
