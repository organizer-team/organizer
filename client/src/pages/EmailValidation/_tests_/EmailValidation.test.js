import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EmailValidation from '../EmailValidation';
import TEST_ID from '../EmailValidation.testid.js';

import { render, fireEvent, screen } from '@testing-library/react';

describe('EmailValidation', () => {
  it('Renders without a problem', () => {
    render(
      <MemoryRouter>
        <EmailValidation />
      </MemoryRouter>
    );

    expect(screen.getByTestId(TEST_ID.container)).toBeInTheDocument();
  });

  it('Should be able to change email', () => {
    const testEmail = 'john@example.com';

    render(
      <MemoryRouter>
        <EmailValidation />
      </MemoryRouter>
    );

    // Check initially email field are empty
    expect(screen.getByTestId(TEST_ID.emailInput).value).toEqual('');
    // Change email field
    fireEvent.change(screen.getByTestId(TEST_ID.emailInput), {
      target: { value: testEmail },
    });

    // Check email field has changed value
    expect(screen.getByTestId(TEST_ID.emailInput).value).toEqual(testEmail);
  });
});
