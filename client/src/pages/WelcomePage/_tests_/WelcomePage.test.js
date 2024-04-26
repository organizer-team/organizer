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
});
