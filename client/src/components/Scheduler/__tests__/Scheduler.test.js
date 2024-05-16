import React from 'react';
import Scheduler from '../Scheduler';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Scheduler.testid';

describe('Scheduler', () => {
  it('renders the Scheduler component', () => {
    render(
      <MemoryRouter>
        <Scheduler />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const schedulerContainer = screen.getByTestId(TEST_ID.container);
    expect(schedulerContainer).toBeInTheDocument();
  });
});
