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
