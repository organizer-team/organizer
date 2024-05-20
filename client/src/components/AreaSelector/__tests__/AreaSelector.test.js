import React from 'react';
import AreaSelector from '../AreaSelector';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../AreaSelector.testid';

describe('AreaSelector', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AreaSelector setArea={jest.fn()} />
      </MemoryRouter>
    );
  });

  it('renders the AreaSelector component', () => {
    // Assert that the component is rendered
    const AreaSelectorContainer = screen.getByTestId(TEST_ID.container);
    expect(AreaSelectorContainer).toBeInTheDocument();
  });
});
