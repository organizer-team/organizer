import React from 'react';
import TimeSelector from '../TimeSelector';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../TimeSelector.testid';

describe('TimeSelector', () => {
  it('renders the TimeSelector component', () => {
    render(
      <MemoryRouter>
        <TimeSelector />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const timeSelectorElement = screen.getByTestId(TEST_ID.element);
    expect(timeSelectorElement).toBeInTheDocument();
  });
});
