import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tasks from '../Tasks';
import TEST_ID from '../Tasks.testid';

describe('TasksPage', () => {
  it('Renders without a problem', async () => {
    await act(async () => {
      render(
        <Router>
          <Tasks />
        </Router>
      );
    });
    expect(screen.getByTestId(TEST_ID.container)).toBeInTheDocument();
  });
});
