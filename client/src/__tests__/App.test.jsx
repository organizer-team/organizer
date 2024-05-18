// We should mock the logging util to prevent errors while logging.js is not available in the client side.

jest.mock('../../../server/src/util/logging.js', () => ({
  logError: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import App from '../App';
import TEST_ID from '../pages/WelcomePage/WelcomePage.testid';

test('renders a react page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const welcomePage = screen.getByTestId(TEST_ID.container);
  expect(welcomePage).toBeInTheDocument();
});
