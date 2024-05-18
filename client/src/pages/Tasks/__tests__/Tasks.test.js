import React from 'react';
import { render, screen, act } from '@testing-library/react';
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
    expect(
      screen.getByTestId(TEST_ID.container)
    ).toBeInTheDocument();
  });

  it('tasks fetch correctly', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
    global.fetch = fetch;

    await act(async () => {
      render(
        <Router>
          <Tasks />
        </Router>
      );
    });

  });
  
});
