import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserContext } from '../../../context/UserContext';

import Home from '../Home';
import TEST_ID_HOME from '../Home.testid';

describe('Home', () => {
  it('Renders without a problem', async () => {
    const mockUser = {
      userName: 'Test User',
      email: 'test@example.com',
      userId: '123',
    };

    await act(async () => {
      render(
        <UserContext.Provider value={{ user: mockUser }}>
          <Home />
        </UserContext.Provider>
      );
    });

    expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument();
  });
});
