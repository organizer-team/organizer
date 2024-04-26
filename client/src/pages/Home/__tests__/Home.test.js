import React from 'react';
import { render, screen, act } from '@testing-library/react';

import Home from '../Home';
import TEST_ID_HOME from '../Home.testid';

describe('Home', () => {
  it('Renders without a problem', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument();
  });
});
