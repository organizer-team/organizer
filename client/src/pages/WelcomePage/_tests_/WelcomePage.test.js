import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import WelcomePage from '../WelcomePage';
import TEST_ID_WELCOME_PAGE from '../WelcomePage.testid';

describe('WelcomePage', () => {
  it('Renders without a problem', async () => {
    await act(async () => {
      render(
        <Router>
          <WelcomePage />
        </Router>
      );
    });
    expect(
      screen.getByTestId(TEST_ID_WELCOME_PAGE.container)
    ).toBeInTheDocument();
  });
  it('Redirects to /email-validation when userAccountLink is clicked', async () => {
    await act(async () => {
      render(
        <Router>
          <WelcomePage />
        </Router>
      );
    });
    const userAccountLink = screen.getByTestId(
      TEST_ID_WELCOME_PAGE.userAccountLink
    );
    act(() => userAccountLink.click());
    expect(window.location.pathname).toBe('/email-validation');
  });
  // guestUserButton should be clicked and the fetch should be successful
  it('Clicking guestUserButton should fetch', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
    global.fetch = fetch;

    await act(async () => {
      render(
        <Router>
          <WelcomePage />
        </Router>
      );
    });

    const guestUserButton = screen.getByTestId(
      TEST_ID_WELCOME_PAGE.guestUserButton
    );
    await act(async () => guestUserButton.click());
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
