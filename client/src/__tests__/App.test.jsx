import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import App from '../App';
import TEST_ID_EMAIL_VALIDATION from '../pages/EmailValidation/EmailValidation.testid';

test('renders a react page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const homeElement = screen.getByTestId(TEST_ID_EMAIL_VALIDATION.container);
  expect(homeElement).toBeInTheDocument();
});
